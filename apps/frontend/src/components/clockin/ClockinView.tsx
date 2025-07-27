import { KeyRound, Fingerprint, Settings } from 'lucide-react'
import { Button } from '../shared/Button'
import { Card } from '../shared/Card'
import { useCurrentTime } from '@hooks/useCurrentTime'

interface ClockinViewProps {
  onPinLogin: () => void
  onAdminAccess: () => void
}

export function ClockinView ({ onPinLogin, onAdminAccess }: ClockinViewProps): React.ReactElement {
  const { currentTime } = useCurrentTime()

  return (
    <div className='min-h-screen flex flex-col items-center justify-center p-8 bg-[#F4F6F8]'>
      {/* Header */}
      <div className='w-full max-w-md mb-8 text-center'>
        <div className='w-16 h-16 bg-[#004E64] rounded-full flex items-center justify-center mx-auto mb-4'>
          <span className='text-white font-bold text-xl'>LOGO</span>
        </div>
        <h1 className='text-3xl font-bold text-[#2C2C2C] mb-2'>Marca tu entrada o salida</h1>
        <div className='text-2xl font-mono text-[#004E64] bg-white rounded-lg p-4 shadow-sm'>
          {currentTime.toLocaleTimeString('es-ES')}
        </div>
      </div>

      {/* Main Action Area */}
      <Card className='w-full max-w-md p-8 bg-white shadow-lg border-0'>
        <div className='text-center space-y-6'>
          {/* PIN Login Button */}
          <div className='space-y-4'>
            <Button
              onClick={onPinLogin}
              className='w-full h-16 bg-[#FF914D] hover:bg-[#FF914D]/90 text-white text-lg font-medium shadow-lg'
            >
              <KeyRound className='w-6 h-6 mr-3' />
              Ingresar con PIN
            </Button>
          </div>

          {/* External Fingerprint Indicator */}
          <div className='pt-6 border-t border-gray-200'>
            <div className='flex items-center justify-center space-x-3 text-[#004E64] bg-[#004E64]/5 rounded-lg p-4'>
              <Fingerprint className='w-5 h-5' />
              <div className='text-left'>
                <p className='font-medium text-sm'>Lector de huella disponible</p>
                <p className='text-xs text-gray-600'>Usa el dispositivo externo para acceso rápido</p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Admin Access */}
      <Button onClick={onAdminAccess} variant='ghost' className='mt-8 text-[#004E64] hover:text-[#004E64]/80'>
        <Settings className='w-4 h-4 mr-2' />
        Acceso Administrador
      </Button>

      {/* Footer */}
      <div className='mt-8 text-center text-sm text-gray-500'>Sistema de asistencia – Versión 1.0</div>
    </div>
  )
}
