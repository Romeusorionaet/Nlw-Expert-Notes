import * as Dialog from '@radix-ui/react-dialog'
import { Circle, StopCircle, X } from 'lucide-react'
import { ChangeEvent, FormEvent, useState } from 'react'
import { toast } from 'sonner'

interface NewNoteCardProps {
  onNoteCreated: (content: string) => void
}

export function NewNoteCard({ onNoteCreated }: NewNoteCardProps) {
  const [shouldShowOnBoarding, setShouldShowOnBoarding] = useState(true)
  const [isRecording, setIsRecording] = useState(false)
  const [content, setContent] = useState('')

  const handleStartEditor = () => {
    setShouldShowOnBoarding(false)
  }

  const handleContentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value)

    if (event.target.value === '') {
      setShouldShowOnBoarding(true)
    }
  }

  const handleSaveNote = (event: FormEvent) => {
    event.preventDefault()

    onNoteCreated(content)

    toast.success('Nota criada com sucesso!')

    setShouldShowOnBoarding(true)
    setContent('')
  }

  let speechRecognition: SpeechRecognition | null

  const handleStartRecording = () => {
    const isSpeechRecognitionAPIAvailable =
      'SpeechRecognition' in window || 'webkitSpeechRecognition' in window

    if (!isSpeechRecognitionAPIAvailable) {
      alert('Infelizmente seu navegador não suporta a API de gravação!')
      return
    }

    setIsRecording(true)
    setShouldShowOnBoarding(false)

    const SpeechRecognitionAPI =
      window.SpeechRecognition || window.webkitSpeechRecognition

    speechRecognition = new SpeechRecognitionAPI()

    speechRecognition.lang = 'pt-BR'
    speechRecognition.continuous = true
    speechRecognition.maxAlternatives = 1
    speechRecognition.interimResults = true

    speechRecognition.onresult = (event) => {
      const transcription = Array.from(event.results).reduce((text, result) => {
        return text.concat(result[0].transcript)
      }, '')

      setContent(transcription)
    }

    speechRecognition.onerror = (event) => {
      console.error(event)
    }

    speechRecognition.start()
  }

  const handleStopRecording = () => {
    setIsRecording(false)
    setShouldShowOnBoarding(true)

    if (speechRecognition !== null) {
      speechRecognition.stop()
    }
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger className="rounded-md flex flex-col gap-3 text-left bg-slate-700 p-5 hover:ring-2 hover:ring-slate-600 duration-300 outline-none focus-visible:ring-2 focus-visible:ring-lime-500">
        <span className="text-sm font-medium text-slate-200">
          Adicionar nota
        </span>
        <p className="text-sm leading-6 text-slate-400">
          Grave uma nota em áudio que será convertida para texto
          automaticamente.
        </p>

        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-slate-950/70 to-black/0" />
      </Dialog.Trigger>
      <Dialog.DialogPortal>
        <Dialog.Overlay className="inset-0 fixed bg-black/60">
          <Dialog.DialogContent className="overflow-hidden fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[640px] w-full h-[60vh] bg-slate-700 rounded-md flex flex-col outline-none">
            <Dialog.DialogClose className="absolute bottom right-0 top-0 bg-slate-800 p-1.5 text-slate-400 hover:text-slate-100">
              <X className="size-5" />
            </Dialog.DialogClose>

            <form onSubmit={handleSaveNote} className="flex-1 flex flex-col">
              <div className="flex flex-1 flex-col gap-3 p-5">
                <span className="text-sm font-medium text-slate-200">
                  Adicionar nota
                </span>
                {shouldShowOnBoarding ? (
                  <p className="text-sm leading-6 text-slate-400">
                    Comece{' '}
                    <button
                      type="button"
                      onClick={handleStartRecording}
                      className="font-medium text-lime-400 hover:underline"
                    >
                      gravando uma nota
                    </button>{' '}
                    em áudio ou se preferir{' '}
                    <button
                      type="button"
                      onClick={handleStartEditor}
                      className="font-medium text-lime-400 hover:underline"
                    >
                      utilize apenas texto
                    </button>
                  </p>
                ) : (
                  <textarea
                    onChange={handleContentChange}
                    autoFocus
                    value={content}
                    className="text-sm leading-6 text-slate-300 bg-transparent resize-none flex-1 outline-none"
                  ></textarea>
                )}
              </div>

              {isRecording ? (
                <button
                  type="button"
                  onClick={handleStopRecording}
                  className="w-full flex justify-center items-center gap-2 bg-slate-800 py-4 font-medium text-center text-sm text-slate-300 to-slate-900 outline-none hover:text-slate-100 duration-300"
                >
                  <Circle className="bg-red-500 animate-pulse text-red-500 rounded-full size-3" />
                  Gravando... clique p/ interromper
                  <StopCircle className="size-5 text-white" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={content === ''}
                  className="w-full disabled:cursor-not-allowed disabled:bg-lime-700 bg-lime-400 py-4 font-medium text-center text-sm text-lime-950 to-slate-300 outline-none hover:bg-lime-500 duration-300"
                >
                  Salvar nota
                </button>
              )}
            </form>
          </Dialog.DialogContent>
        </Dialog.Overlay>
      </Dialog.DialogPortal>
    </Dialog.Root>
  )
}
