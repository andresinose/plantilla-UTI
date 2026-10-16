import { useState } from 'react';
import { AppLayout, Button, Card } from './components';
import { ComponentGallery } from './examples/ComponentGallery';

/** Sustituye Inicio con tus vistas. Tema y layout no dependen de la galería. */
export default function App() {
  const [page, setPage] = useState('inicio');
  return <AppLayout activeId={page} onChange={setPage} items={[
    { id: 'inicio', label: 'Inicio' },
    { id: 'componentes', label: 'Componentes' },
  ]}>
    <h1 className="text-2xl font-bold">{page === 'inicio' ? 'Plantilla base UTI' : 'Galería de componentes'}</h1>
    {page === 'inicio' ? <Card title="Tu próximo proyecto empieza aquí" description="Base de interfaz reutilizable con React, TypeScript y Tailwind.">
      <p className="text-sm text-muted mb-5">Reemplaza esta vista con las pantallas de tu aplicación. La galería muestra los componentes y sus estados.</p>
      <Button onClick={() => setPage('componentes')}>Explorar componentes</Button>
    </Card> : <ComponentGallery />}
  </AppLayout>;
}
