import { useEffect, useRef } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { useData } from '../context/DataContext';
import { useSiteList } from '../content/siteLists';
import { usePageContent } from '../content/usePageContent';
import './Home.css';
import ScrollStory from '../components/ScrollStory';
import BrandCarousel from '../components/BrandCarousel';
import ExportStory from '../components/ExportStory';

function withBreaks(text) {
  const parts = String(text || '').split('\n');
  return parts.map((line, i) => <span key={i}>{line}{i < parts.length - 1 ? <br /> : null}</span>);
}

export default function Home() {
  const { lang } = useLanguage();
  const en = lang === 'en';
  const { brands } = useData();
  const { txt } = usePageContent('home');
  const partners = useSiteList('partners');
  const petPartners = useSiteList('petRetailPartners');
  const root = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); } });
    }, { threshold: 0.08 });
    root.current.querySelectorAll('[data-reveal]').forEach(element => observer.observe(element));
    return () => observer.disconnect();
  }, []);
  return <div ref={root} className="renew-home">
    <ScrollStory en={en} txt={txt} />
    <BrandCarousel brands={brands} en={en} subtitle={txt('brandSubtitle')} />
    <section className="renew-partners renew-container" data-reveal><span className="renew-eyebrow blue">{txt('partnersEyebrow')}</span><h2>{withBreaks(txt('partnersTitle'))}</h2><p>{withBreaks(txt('partnersBody'))}</p><div className="renew-partner-grid">{[...partners,...petPartners].filter(p=>p.logo).map((p,i)=><div className="partner-logo-card" key={`${p.id}-${i}`}><img src={p.logo.includes('/partners/')?`./assets/renewal/partner-${p.logo.split('/').pop().split('.')[0]}.png`:p.logo} alt={en?p.nameEn:p.nameKo} loading="lazy"/></div>)}</div></section>
    <ExportStory en={en} eyebrow={txt('exportEyebrow')} title={txt('exportTitle')} body={txt('exportBody')} button={txt('exportButton')} />
  </div>;
}
