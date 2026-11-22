import bygglarm from '../assets/img/bygglarm.jpg';
import stallningslarm from '../assets/img/stallningslarm.jpg';
import butikKontor from '../assets/img/butik-kontor.jpg';
import kamerabevakning from '../assets/img/kamerabevakning.jpg';
import larmvaska from '../assets/img/larmvaska.jpg';

export const TJANST_BILD: Record<string, { src: ImageMetadata; alt: string }> = {
  bygglarm: { src: bygglarm, alt: 'Byggarbetsplats med lyftkranar i Stockholm' },
  stallningslarm: { src: stallningslarm, alt: 'Fasad inklädd i byggställning under renovering' },
  'butik-kontor': { src: butikKontor, alt: 'Person som slår kod på en larmpanel vid kontorsentré' },
  kamerabevakning: { src: kamerabevakning, alt: 'Rörelsedetektor med inbyggd kamera monterad på ställning' },
  larmvaska: { src: larmvaska, alt: 'Trådlös rörelsedetektor med kamera' },
};
