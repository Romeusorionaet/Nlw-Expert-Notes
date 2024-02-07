import * as Dialog from '@radix-ui/react-dialog'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { X } from 'lucide-react'

interface NoteCardProps {
  note: { date: Date; content: string }
}

export function NoteCard({ note }: NoteCardProps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger className="text-left flex flex-col gap-3 rounded-md bg-slate-800 p-5 overflow-hidden relative hover:ring-2 hover:ring-slate-600 duration-300 outline-none focus-visible:ring-2 focus-visible:ring-lime-500">
        <span className="text-sm font-medium text-slate-200">
          {formatDistanceToNow(note.date, {
            locale: ptBR,
            addSuffix: true,
          })}
        </span>
        <p className="text-sm leading-6 text-slate-400">{note.content}</p>

        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-slate-950/70 to-black/0 pointer-events-none" />
      </Dialog.Trigger>
      <Dialog.DialogPortal>
        <Dialog.Overlay className="inset-0 fixed bg-black/60">
          <Dialog.DialogContent className="overflow-hidden fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[640px] w-full h-[60vh] bg-slate-700 rounded-md flex flex-col outline-none">
            <Dialog.DialogClose className="absolute bottom right-0 top-0 bg-slate-800 p-1.5 text-slate-400 hover:text-slate-100">
              <X className="size-5" />
            </Dialog.DialogClose>

            <div className="flex flex-1 flex-col gap-3 p-5">
              <span className="text-sm font-medium text-slate-200">
                {formatDistanceToNow(note.date, {
                  locale: ptBR,
                  addSuffix: true,
                })}
              </span>
              <p className="text-sm leading-6 text-slate-400">{note.content}</p>
            </div>

            <button
              type="button"
              className="group w-full bg-slate-800 py-4 font-medium text-center to-slate-300 outline-none"
            >
              Deseja{' '}
              <span className="text-red-400 group-hover:underline">
                apagar essa nota?
              </span>
            </button>
          </Dialog.DialogContent>
        </Dialog.Overlay>
      </Dialog.DialogPortal>
    </Dialog.Root>
  )
}
