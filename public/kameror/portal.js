'use strict';

const P = new URL('../ms', location.href).pathname.replace(/\/$/, '');
const $ = id => document.getElementById(id);
const loginForm = $('login-form');
const passwordField = $('password');
const cameraGrid = $('camera-grid');
const viewer = $('viewer');
const recordingForm = $('recording-form');
const recordingTime = $('recording-time');
const recordingButton = $('recording-button');
const backToLive = $('back-to-live');
const tiles = new Map();
const liveClock = new Intl.DateTimeFormat('sv-SE', { timeStyle: 'medium' });
const recordingClock = new Intl.DateTimeFormat('sv-SE', {
  dateStyle: 'short', timeStyle: 'medium'
});

let sdkReady;
let sdk;
let credentials;
let phase = 'signed-out';
let session = null;
let viewing = null;
let pageActive = true;

function loadSdk() {
  if (sdkReady) return sdkReady;

  sdkReady = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    let timer;
    const fail = () => {
      clearTimeout(timer);
      script.remove();
      reject(new Error('SDK kunde inte laddas'));
    };

    timer = setTimeout(fail, 15000);
    script.src = P + '/XPMobileSDK/XPMobileSDK.js';
    script.onerror = fail;
    script.onload = () => {
      const mobileSdk = window.XPMobileSDK;
      if (!mobileSdk || !window.XPMobileSDKSettings) {
        fail();
        return;
      }

      window.XPMobileSDKSettings.EnableConsoleLog = false;
      const ready = () => {
        clearTimeout(timer);
        resolve(mobileSdk);
      };
      if (mobileSdk.isLoaded()) ready();
      else mobileSdk.onLoad = ready;
    };
    document.head.append(script);
  }).catch(error => {
    sdkReady = null;
    throw error;
  });

  return sdkReady;
}

function loginBusy(busy, label = 'Loggar in…') {
  $('login-fields').disabled = busy;
  $('login-button').textContent = busy ? label : 'Logga in';
  loginForm.setAttribute('aria-busy', String(busy));
}

function beginLogin() {
  phase = 'connecting';
  $('login-notice').textContent = '';
  $('login-error').textContent = '';
  loginBusy(true);
}

function loginError(message) {
  credentials = null;
  phase = 'signed-out';
  loginBusy(false);
  $('login-error').textContent = message;
  if (document.activeElement === document.body) $('username').focus();
}

function showPortal(signedIn) {
  $('login-view').hidden = signedIn;
  for (const id of ['portal-view', 'header-title', 'header-phone', 'logout']) {
    $(id).hidden = !signedIn;
  }
}

function leavePortal(message) {
  if (phase !== 'closing') session = null;
  closeViewer();
  clearTiles();
  session = null;
  showPortal(false);
  loginForm.reset();
  $('login-error').textContent = '';
  $('login-notice').textContent = message;
  if (phase !== 'closing') {
    phase = 'signed-out';
    loginBusy(false);
    $('username').focus();
  }
}

const connectionObserver = {
  connectionDidConnect() {
    if (phase !== 'connecting' || !credentials) return;
    const { user, pswd, loginType } = credentials;
    credentials = null;
    phase = 'authenticating';
    try {
      sdk.login(user, pswd, loginType);
    } catch {
      disconnect('Inloggningen kunde inte slutföras. Försök igen.', true);
    }
  },
  connectionFailedToConnect() {
    if (phase === 'connecting') loginError('Kunde inte ansluta till kameraservern. Försök igen.');
  },
  connectionFailedToLogIn(error) {
    if (phase !== 'authenticating') return;
    const invalid = sdk.library.ConnectionError.InvalidCredentials;
    loginError(Number(error?.code) === invalid
      ? 'Fel användarnamn eller lösenord'
      : 'Inloggningen misslyckades. Försök igen.');
  },
  connectionRequiresCode() {
    if (phase !== 'authenticating') return;
    disconnect('Kontot kräver en andra verifiering. Ring 08-752 98 00 för hjälp.', true);
  },
  connectionDidLogIn() {
    if (phase !== 'authenticating') return;
    phase = 'signed-in';
    session = {};
    loginBusy(false);
    showPortal(true);
    loadCameras();
    $('camera-heading').focus();
  },
  connectionLostConnection() {
    if (phase === 'signed-in') leavePortal('Anslutningen till kameraservern bröts. Logga in igen.');
    else if (phase === 'connecting' || phase === 'authenticating') {
      loginError('Anslutningen till kameraservern bröts. Försök igen.');
    }
  },
  connectionDidDisconnect() {
    if (phase === 'closing') {
      finishDisconnect();
    } else if (phase === 'signed-in') {
      leavePortal('Sessionen har avslutats. Logga in igen.');
    } else if (phase === 'connecting' || phase === 'authenticating') {
      loginError('Anslutningen till kameraservern bröts. Försök igen.');
    }
  }
};

async function connect() {
  try {
    const mobileSdk = await loadSdk();
    window.XPMobileSDKSettings.MobileServerURL = location.origin + P;
    window.XPMobileSDKSettings.EnableConsoleLog = false;
    window.logger.init();
    if (!sdk) {
      sdk = mobileSdk;
      sdk.addObserver(connectionObserver);
    }
    sdk.connect(location.origin + P);
  } catch {
    loginError('Kunde inte ansluta till kameraservern. Försök igen.');
  }
}

loginForm.addEventListener('submit', event => {
  event.preventDefault();
  if (phase !== 'signed-out') return;
  credentials = {
    user: $('username').value,
    pswd: passwordField.value,
    loginType: $('basic-login').checked ? 'Basic' : 'Windows'
  };
  passwordField.value = '';
  beginLogin();
  connect();
});

function finishDisconnect() {
  phase = 'signed-out';
  loginBusy(false);
  $('username').focus();
}

function disconnect(message, isError = false) {
  phase = 'closing';
  loginBusy(true, 'Loggar ut…');
  leavePortal(isError ? '' : message);
  if (isError) $('login-error').textContent = message;
  try {
    sdk.disconnect();
  } catch {
    finishDisconnect();
  }
}

$('logout').addEventListener('click', () => disconnect('Du har loggats ut.'));

function flattenCameras(items, cameras = new Map(), view = '') {
  for (const item of items ?? []) {
    const name = item.Name ?? item.name ?? '';
    if ((item.Type ?? item.type) === 'Camera') {
      const id = item.Id ?? item.id;
      if (id && !cameras.has(id)) cameras.set(id, { id, name, view });
    } else {
      flattenCameras(item.Items ?? item.items, cameras, name || view);
    }
  }
  return cameras;
}

function clearTiles() {
  for (const [element, tile] of tiles) {
    observer.unobserve(element);
    tile.feed.stop();
  }
  tiles.clear();
  cameraGrid.replaceChildren();
}

function loadCameras() {
  const current = session;
  clearTiles();
  $('camera-count').hidden = true;
  $('camera-empty').hidden = true;
  $('camera-error').hidden = true;
  $('camera-status').textContent = 'Hämtar kameror…';
  cameraGrid.setAttribute('aria-busy', 'true');

  for (let index = 0; index < 3; index++) {
    const skeleton = document.createElement('div');
    skeleton.className = 'camera-card skeleton';
    skeleton.setAttribute('aria-hidden', 'true');
    skeleton.innerHTML = '<div class="media-stage"></div><div class="camera-copy"><span></span><span></span></div>';
    cameraGrid.append(skeleton);
  }

  const finish = () => {
    cameraGrid.removeAttribute('aria-busy');
    cameraGrid.replaceChildren();
  };

  sdk.getAllViews(items => {
    if (session !== current) return;
    const cameras = flattenCameras(items);
    finish();
    const count = cameras.size === 1 ? '1 kamera' : `${cameras.size} kameror`;
    $('camera-count').textContent = count;
    $('camera-count').hidden = false;
    $('camera-empty').hidden = cameras.size !== 0;
    $('camera-status').textContent = cameras.size ? count : $('camera-empty').textContent.trim();
    for (const camera of cameras.values()) addCamera(camera);
  }, () => {
    if (session !== current) return;
    finish();
    $('camera-status').textContent = '';
    $('camera-error').hidden = false;
  });
}

$('reload-cameras').addEventListener('click', () => {
  $('camera-heading').focus();
  loadCameras();
});

function addCamera(camera) {
  const element = $('camera-template').content.firstElementChild.cloneNode(true);
  const openButton = element.querySelector('.open-camera');
  openButton.textContent = camera.name;
  element.querySelector('.view-name').textContent = camera.view;
  openButton.addEventListener('click', () => openViewer(camera));
  const tile = { visible: false };
  tile.feed = createFeed(camera, element.querySelector('.camera-media'), {
    width: 640, height: 360, fps: 2,
    canPlay: () => tile.visible && !viewer.open
  });
  tiles.set(element, tile);
  cameraGrid.append(element);
  observer.observe(element);
}

const observer = new IntersectionObserver(entries => {
  for (const entry of entries) {
    const tile = tiles.get(entry.target);
    if (!tile) continue;
    tile.visible = entry.isIntersecting;
    tile.feed.sync();
  }
});

function syncStreams() {
  for (const tile of tiles.values()) tile.feed.sync();
  viewing?.feed.sync();
}

document.addEventListener('visibilitychange', syncStreams);
window.addEventListener('pagehide', () => {
  pageActive = false;
  syncStreams();
});
window.addEventListener('pageshow', () => {
  pageActive = true;
  syncStreams();
});

function createFeed(camera, container, { width, height, fps, canPlay }) {
  container.replaceChildren($('media-template').content.cloneNode(true));
  const image = container.querySelector('img');
  const meta = container.querySelector('.media-meta');
  const badge = meta.querySelector('.media-badge');
  const time = meta.querySelector('time');
  const loading = container.querySelector('.media-loading');
  const error = container.querySelector('.media-error');
  const retry = error.querySelector('button');
  const owner = session;
  let run;
  let url;
  let failed = false;
  let recorded = false;

  function clearImage() {
    image.hidden = true;
    image.removeAttribute('src');
    meta.hidden = true;
    if (url) URL.revokeObjectURL(url);
    url = null;
  }

  function showImage(source, date, mode) {
    const previous = url;
    url = source;
    image.src = source;
    image.alt = mode === 'live' ? `Livebild från ${camera.name}` : `Inspelad bild från ${camera.name}`;
    if (previous) URL.revokeObjectURL(previous);
    image.hidden = false;
    meta.hidden = false;
    const live = mode === 'live';
    badge.textContent = live ? 'LIVE' : 'Inspelning';
    badge.dataset.mode = mode;
    time.dateTime = date.toISOString();
    time.textContent = live ? liveClock.format(date) : recordingClock.format(date);
    if (live) time.setAttribute('aria-label', `Mottagen ${time.textContent}`);
    else time.removeAttribute('aria-label');
    loading.hidden = true;
  }

  function stop() {
    const active = run;
    run = null;
    if (active) {
      active.controller.abort();
      clearTimeout(active.timer);
      clearTimeout(active.startTimeout);
      if (active.stream && session === owner) active.stream.close();
    }
    clearImage();
    loading.hidden = failed;
  }

  function fail(active) {
    if (run !== active) return;
    failed = true;
    stop();
    error.hidden = false;
  }

  async function pull(active) {
    const started = performance.now();
    try {
      const response = await fetch(`${P}/XProtectMobile/Video`, {
        method: 'POST',
        headers: { 'X-MS-Video-Id': active.stream.videoId },
        cache: 'no-store',
        signal: AbortSignal.any([active.controller.signal, AbortSignal.timeout(10000)])
      });
      if (!response.ok) throw new Error();
      const buffer = await response.arrayBuffer();
      if (run !== active) return;
      const frame = new sdk.library.VideoHeaderParser(buffer);
      if (frame.blob?.size) {
        clearTimeout(active.startTimeout);
        active.lastFrame = performance.now();
        showImage(URL.createObjectURL(frame.blob), new Date(), 'live');
      } else if (performance.now() - active.lastFrame >= 10000) {
        fail(active);
        return;
      }
      const remaining = 1000 / fps - (performance.now() - started);
      active.timer = setTimeout(() => pull(active), Math.max(0, remaining));
    } catch {
      fail(active);
    }
  }

  function start() {
    const active = { controller: new AbortController(), lastFrame: performance.now() };
    run = active;
    active.startTimeout = setTimeout(() => fail(active), 12000);

    try {
      sdk.RequestStream({
        CameraId: camera.id,
        SignalType: 'Live', StreamType: 'Transcoded', MethodType: 'Pull',
        DestWidth: width, DestHeight: height, Fps: fps, ComprLevel: 70
      }, stream => {
        if (run !== active) {
          if (session === owner) stream.close();
          return;
        }

        active.stream = stream;
        pull(active);
      }, () => fail(active));
    } catch {
      fail(active);
    }
  }

  function sync() {
    if (recorded) return;
    const visible = session === owner && pageActive && !document.hidden && canPlay();
    if (!visible && run) stop();
    if (visible && !run && !failed) start();
  }

  retry.addEventListener('click', () => {
    failed = false;
    loading.hidden = false;
    const focusTarget = container.closest('.camera-card')?.querySelector('.open-camera')
      ?? viewer.querySelector('[autofocus]');
    focusTarget.focus();
    error.hidden = true;
    sync();
  });

  return {
    stop, sync,
    showRecording(blob, date) {
      recorded = true;
      stop();
      error.hidden = true;
      showImage(URL.createObjectURL(blob), date, 'recording');
    },
    showLive() {
      recorded = false;
      failed = false;
      clearImage();
      error.hidden = true;
      loading.hidden = false;
      sync();
    }
  };
}

function openViewer(camera) {
  if (viewer.open || !session) return;
  $('viewer-title').textContent = camera.name;
  recordingForm.reset();
  $('recording-error').textContent = '';
  recordingButton.disabled = false;
  backToLive.disabled = true;
  const feed = createFeed(camera, $('viewer-media'), {
    width: 1280, height: 720, fps: 5,
    canPlay: () => viewer.open
  });
  viewing = { camera, feed, request: null, recorded: false };
  viewer.showModal();
  syncStreams();
}

function cancelRecording(current) {
  const pending = current.request;
  current.request = null;
  if (pending) {
    clearTimeout(pending.timeout);
    if (pending.sdkRequest) sdk.cancelRequest(pending.sdkRequest);
  }
  recordingButton.disabled = false;
  recordingButton.textContent = 'Visa';
}

function closeViewer() {
  if (!viewing) return;
  cancelRecording(viewing);
  viewing.feed.stop();
  viewing = null;
  if (viewer.open) viewer.close();
}

viewer.addEventListener('close', () => {
  if (viewer.open) return;
  closeViewer();
  syncStreams();
});

recordingForm.addEventListener('submit', event => {
  event.preventDefault();
  const current = viewing;
  if (!current || current.request) return;
  const date = new Date(recordingTime.value);
  if (!Number.isFinite(date.getTime())) {
    $('recording-error').textContent = 'Välj datum och tid för bilden.';
    return;
  }

  $('recording-error').textContent = '';
  recordingButton.disabled = true;
  recordingButton.textContent = 'Hämtar…';
  backToLive.disabled = false;
  const pending = {};
  current.request = pending;

  const stillViewing = () => viewer.open && viewing === current && current.request === pending;
  const fail = () => {
    if (!stillViewing()) return;
    cancelRecording(current);
    backToLive.disabled = !current.recorded;
    $('recording-error').textContent = 'Ingen inspelad bild kunde visas för den valda tidpunkten.';
  };
  pending.timeout = setTimeout(fail, 15000);

  try {
    pending.sdkRequest = sdk.getThumbnailByTime({
      cameraId: current.camera.id, time: date.getTime(), width: 1280, height: 720
    }, async (base64, timestamp) => {
      pending.sdkRequest = null;
      if (!stillViewing()) return;
      const probe = new Image();
      try {
        if (typeof base64 !== 'string' || !base64) throw new Error();
        const bytes = Uint8Array.from(atob(base64), character => character.charCodeAt(0));
        const blob = new Blob([bytes], { type: 'image/jpeg' });
        const preview = URL.createObjectURL(blob);
        try {
          probe.src = preview;
          await probe.decode();
        } finally {
          URL.revokeObjectURL(preview);
        }
        if (!stillViewing()) return;
        const serverTime = new Date(Number(timestamp));
        const shownTime = timestamp && Number.isFinite(serverTime.getTime()) ? serverTime : date;
        current.feed.showRecording(blob, shownTime);
        current.recorded = true;
        cancelRecording(current);
      } catch {
        fail();
      }
    }, () => {
      pending.sdkRequest = null;
      fail();
    });
  } catch {
    fail();
  }
});

backToLive.addEventListener('click', () => {
  if (!viewing) return;
  const wasRecorded = viewing.recorded;
  cancelRecording(viewing);
  viewing.recorded = false;
  $('recording-error').textContent = '';
  if (wasRecorded) viewing.feed.showLive();
  recordingTime.focus();
  backToLive.disabled = true;
});

