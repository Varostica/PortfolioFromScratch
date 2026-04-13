import Spinner from './Spinner'

interface PreloaderProps {
  load: boolean
}

export default function Preloader({ load }: PreloaderProps) {
  return (
    <div id={load ? 'preloader' : 'preloader-none'}>
      <Spinner size="lg" />
    </div>
  )
}
