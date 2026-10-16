import { useState, useRef, type FormEvent } from 'react';
import { Alert, Badge, Button, Card, DataTable, DropZone, Input, Modal, StatCard, Toggle, type Column } from '../components';
import { useTheme } from '../theme/ThemeProvider';

interface DemoRow { id: number; nombre: string; estado: 'Activo' | 'Pendiente' | 'Error' }
const rows: DemoRow[] = [
  { id: 1, nombre: 'Elemento A', estado: 'Activo' },
  { id: 2, nombre: 'Elemento B', estado: 'Pendiente' },
  { id: 3, nombre: 'Elemento C', estado: 'Error' },
];
const tones = { Activo: 'success', Pendiente: 'warning', Error: 'danger' } as const;
const columns: Column<DemoRow>[] = [
  { key: 'id', header: 'ID' }, { key: 'nombre', header: 'Nombre' },
  { key: 'estado', header: 'Estado', render: row => <Badge tone={tones[row.estado]}>{row.estado}</Badge> },
];
export function ComponentGallery() {
  const modalInput = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [enabled, setEnabled] = useState(true);
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState('');
  const [files, setFiles] = useState<string[]>([]);
  const [detail, setDetail] = useState<DemoRow | null>(null);
  const { preference, setPreference } = useTheme();
  const error = submitted && !name.trim() ? 'Escribe tu nombre.' : undefined;
  function submit(event: FormEvent) {
    event.preventDefault(); setSubmitted(true);
    setMessage(name.trim() ? `Formulario de ejemplo enviado por ${name.trim()}.` : '');
  }
  return <>
    <Card title="Métricas"><div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <StatCard label="Métrica" value="128" status="Activo" />
      <StatCard label="Pendientes" value="42" status="Revisar" statusTone="warning" />
      <StatCard label="Incidencias" value="7" status="Error" statusTone="danger" />
    </div></Card>
    <Card title="Botones y etiquetas"><div className="flex flex-wrap gap-3 mb-5">
      <Button onClick={() => setOpen(true)}>Abrir modal</Button>
      <Button variant="secondary">Secundario</Button><Button variant="ghost">Ghost</Button>
      <Button variant="danger">Peligro</Button><Button disabled>Deshabilitado</Button><Button loading>Guardando…</Button>
    </div><div className="flex flex-wrap gap-2">
      {(['neutral', 'brand', 'highlight', 'success', 'warning', 'danger', 'info'] as const).map(tone => <Badge key={tone} tone={tone}>{tone}</Badge>)}
    </div></Card>
    <Card title="Formulario"><form onSubmit={submit} noValidate className="space-y-4">
      <Input label="Nombre" name="name" autoComplete="name" required value={name} onChange={e => setName(e.target.value)} hint="Campo obligatorio de ejemplo." error={error} />
      <Input label="Campo deshabilitado" disabled value="Solo demostración" />
      <Toggle label="Opción activa" name="enabled" checked={enabled} onChange={setEnabled} />
      <div><Button type="submit">Enviar ejemplo</Button></div>
      {message && <Alert tone="success">{message}</Alert>}
    </form></Card>
    <Card title="Alertas"><div className="space-y-3">
      <Alert tone="success">Operación completada.</Alert><Alert tone="warning">Hay datos pendientes de revisión.</Alert>
      <Alert tone="danger">No se pudo completar la operación.</Alert><Alert tone="info">Información adicional.</Alert>
    </div></Card>
    <Card title="Archivos" description="PNG, JPG o PDF. Máximo 2 MB por archivo.">
      <DropZone accept=".png,.jpg,.jpeg,.pdf" multiple maxSize={2 * 1024 * 1024} onFiles={items => setFiles(items.map(file => file.name))} />
      <p role="status" className="mt-3 text-sm text-muted">{files.length ? `Seleccionados: ${files.join(', ')}` : 'Ningún archivo seleccionado.'}</p>
    </Card>
    <DataTable caption="Elementos de ejemplo" rows={rows} columns={columns} rowKey={row => row.id} onRowClick={setDetail} rowActionLabel={row => `Ver ${row.nombre}`} />
    <DataTable caption="Tabla sin resultados" rows={[]} columns={columns} rowKey={row => row.id} />
    <DataTable caption="Tabla en carga" rows={[]} columns={columns} rowKey={row => row.id} loading />
    <Card title="Preferencia de tema"><label className="text-sm font-semibold" htmlFor="theme-preference">Apariencia</label>
      <select id="theme-preference" className="ml-3 p-2 rounded border border-line bg-surface" value={preference} onChange={e => setPreference(e.target.value as typeof preference)}>
        <option value="system">Seguir al sistema</option><option value="light">Claro</option><option value="dark">Oscuro</option>
      </select>
    </Card>
    <Modal isOpen={open} onClose={() => setOpen(false)} title="Configuración de ejemplo" closeOnBackdrop initialFocusRef={modalInput}
      footer={<Button onClick={() => setOpen(false)}>Listo</Button>}>
      <Input ref={modalInput} label="Nombre de configuración" placeholder="Escribe aquí" />
      <p className="mt-4 text-sm text-muted">Prueba Tab, Mayús + Tab y Escape. El foco vuelve al botón que abrió el diálogo.</p>
    </Modal>
    <Modal isOpen={detail !== null} onClose={() => setDetail(null)} title="Detalle del elemento">
      {detail && <p>{detail.nombre}: {detail.estado}</p>}
    </Modal>
  </>;
}
