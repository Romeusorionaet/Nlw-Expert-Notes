export function NoteCard() {
  return (
    <button className="text-left rounded-md bg-slate-800 p-5 space-y-3 overflow-hidden relative hover:ring-2 hover:ring-slate-600 duration-300 outline-none focus-visible:ring-2 focus-visible:ring-emerald-600">
      <span className="text-sm font-medium text-slate-200">há 2 dias</span>
      <p className="text-sm leading-6 text-slate-400">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit totam iste
        optio, alias, non rerum ea fugit provident eligendi, autem et laboriosam
        porro illo omnis assumenda magnam aperiam minima dolore. Lorem ipsum
        dolor sit amet consectetur adipisicing elit. Odit totam iste optio,
        alias, non rerum ea fugit provident eligendi, autem et laboriosam porro
        illo omnis assumenda magnam aperiam minima dolore.
      </p>

      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-slate-950/70 to-black/0 pointer-events-none" />
    </button>
  )
}
