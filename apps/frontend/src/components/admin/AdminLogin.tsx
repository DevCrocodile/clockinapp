import { Button } from '../shared/Button'
import { Card } from '../shared/Card'
import { ArrowLeft, Shield } from 'lucide-react'
import { Input } from '../shared/Input'
import { useField } from '@/hooks/useField'

interface AdminLoginProps {
  onLogin: (username: string, password: string) => void
}

export function AdminLogin ({ onLogin }: AdminLoginProps): React.ReactElement {
  const userName = useField({ type: 'text', required: true })
  const password = useField({ type: 'password', required: true })

  const handleLogin = ({ userName, password }: { userName: string, password: string }): void => {
    if (userName === 'admin' || password === 'admin123') {
      console.log(userName, password)
      window.location.href = '/admin/dashboard'
    }
  }
  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault()
    if (userName.value === '' || password.value === '') {
      return
    }
    handleLogin({ userName: userName.value, password: password.value })
  }
  return (
    <div className='min-h-screen flex flex-col items-center justify-center p-8 bg-[#F4F6F8]'>
      <div className='w-full max-w-md'>
        {/* Back Button */}
        <Button onClick={() => (window.location.href = '/')} variant='ghost' className='mb-6 text-[#004E64] hover:text-[#004E64]/80'>
          <ArrowLeft className='w-4 h-4 mr-2' />
          Volver
        </Button>

        {/* Main Card */}
        <Card className='p-8 bg-white shadow-lg border-0'>
          <div className='text-center space-y-6'>
            {/* Header */}
            <div>
              <div className='w-16 h-16 bg-[#004E64] rounded-full flex items-center justify-center mx-auto mb-4'>
                <Shield className='w-8 h-8 text-white' />
              </div>
              <h1 className='text-2xl font-bold text-[#2C2C2C] mb-2'>Acceso Administrativo</h1>
              <p className='text-gray-600 text-sm'>Acceso solo para administradores</p>
            </div>

            {/* Form */}
            <form className='space-y-4' onSubmit={handleSubmit}>
              <div className='space-y-2 text-left'>
                <Input
                  label='Usuario'
                  field={userName}
                  placeholder='Ingresa tu usuario'
                  className='h-12 border-2 border-gray-200 focus:border-[#004E64]'
                />
              </div>

              <div className='space-y-2 text-left'>
                <Input
                  label='Contraseña'
                  field={password}
                  placeholder='Ingresa tu contraseña'
                  className='h-12 border-2 border-gray-200 focus:border-[#004E64]'
                />
              </div>

              <Button type='submit' className='w-full h-12 bg-[#004E64] hover:bg-[#004E64]/90 text-white font-medium'>
                Entrar
              </Button>
            </form>

          </div>
        </Card>
      </div>
    </div>
  )
}
