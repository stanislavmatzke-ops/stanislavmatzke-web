/**
 * Kontaktní a fakturační údaje na jednom místě.
 * TODO: doplnit IČO a adresu sídla (zákonná povinnost podnikatele na webu).
 */
export const SITE = {
  name: 'Stanislav Matzke',
  email: 'stanislav@stanislavmatzke.com',
  phone: '+420 723 249 650',
  phoneHref: 'tel:+420723249650',
  ico: '[IČO]',
  address: '[Adresa sídla]',
  linkedin: 'https://www.linkedin.com/in/stanislav-matzke',
  github: 'https://github.com/stanislavmatzke-ops',
  jobScoutDemo: 'https://jobscout.stanislavmatzke.com',
  jobScoutRepo: 'https://github.com/stanislavmatzke-ops/job-scout',
  portrait: 'img/stanislav-matzke.jpg',
  cvCz: 'cv/Stanislav_Matzke_CV_CZ.pdf',
  cvEn: 'cv/Stanislav_Matzke_CV_EN.pdf',
} as const;
