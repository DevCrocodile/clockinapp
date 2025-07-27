import { Card, CardHeader, CardTitle, CardContent } from '../shared/Card'
import { Button } from '../shared/Button'
import { LogOut, Users, UserCheck, UserX, FileText, Clock } from 'lucide-react'
import type { Employee, ClockRecord } from '@/types'

interface AdminDashboardProps {
  employees: Employee[]
  clockRecords: ClockRecord[]
  onLogout: () => void
}

export function AdminDashboard ({ employees, clockRecords, onLogout }: AdminDashboardProps): React.ReactElement {
  const today = new Date().toISOString().split('T')[0]
  const todayRecords = clockRecords.filter((record) => record.date === today)

  const activeEmployees = employees.filter((emp) => emp.isActive).length
  const clockInsToday = todayRecords.filter((record) => record.clockIn).length
  const clockOutsToday = todayRecords.filter((record) => record.clockOut).length

  return (
    <div className='min-h-screen bg-[#F4F6F8]'>
      {/* Header */}
      <div className='bg-white shadow-sm border-b'>
        <div className='max-w-7xl mx-auto px-6 py-4'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center space-x-4'>
              <div className='w-10 h-10 bg-[#004E64] rounded-lg flex items-center justify-center'>
                <span className='text-white font-bold'>A</span>
              </div>
              <div>
                <h1 className='text-2xl font-bold text-[#2C2C2C]'>Panel Administrativo</h1>
                <p className='text-gray-600'>Sistema de Control de Asistencia</p>
              </div>
            </div>
            <Button
              onClick={onLogout}
              variant='outline'
              className='border-red-200 text-red-600 hover:bg-red-50 bg-transparent'
            >
              <LogOut className='w-4 h-4 mr-2' />
              Cerrar Sesión
            </Button>
          </div>
        </div>
      </div>

      <div className='max-w-7xl mx-auto p-6'>
        {/* Stats Cards */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
          <Card className='border-0 shadow-sm'>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium text-gray-600'>Empleados Activos</CardTitle>
              <Users className='h-4 w-4 text-[#004E64]' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold text-[#2C2C2C]'>{activeEmployees}</div>
              <p className='text-xs text-gray-600'>Total de empleados habilitados</p>
            </CardContent>
          </Card>

          <Card className='border-0 shadow-sm'>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium text-gray-600'>Clock Ins Hoy</CardTitle>
              <UserCheck className='h-4 w-4 text-[#00B179]' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold text-[#00B179]'>{clockInsToday}</div>
              <p className='text-xs text-gray-600'>Entradas registradas hoy</p>
            </CardContent>
          </Card>

          <Card className='border-0 shadow-sm'>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium text-gray-600'>Clock Outs Hoy</CardTitle>
              <UserX className='h-4 w-4 text-[#FF914D]' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold text-[#FF914D]'>{clockOutsToday}</div>
              <p className='text-xs text-gray-600'>Salidas registradas hoy</p>
            </CardContent>
          </Card>
        </div>

        {/* Navigation Cards */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <Card
            className='border-0 shadow-sm cursor-pointer hover:shadow-md transition-shadow'
            onClick={() => {}}
          >
            <CardHeader>
              <div className='flex items-center space-x-3'>
                <div className='w-12 h-12 bg-[#004E64] rounded-lg flex items-center justify-center'>
                  <FileText className='w-6 h-6 text-white' />
                </div>
                <div>
                  <CardTitle className='text-[#2C2C2C]'>Reportes de Asistencia</CardTitle>
                  <p className='text-gray-600 text-sm'>Consulta y exporta registros de entrada y salida</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Button className='w-full bg-[#004E64] hover:bg-[#004E64]/90'>Ver Reportes</Button>
            </CardContent>
          </Card>

          <Card
            className='border-0 shadow-sm cursor-pointer hover:shadow-md transition-shadow'
            onClick={() => {}}
          >
            <CardHeader>
              <div className='flex items-center space-x-3'>
                <div className='w-12 h-12 bg-[#00B179] rounded-lg flex items-center justify-center'>
                  <Users className='w-6 h-6 text-white' />
                </div>
                <div>
                  <CardTitle className='text-[#2C2C2C]'>Gestión de Empleados</CardTitle>
                  <p className='text-gray-600 text-sm'>Administra empleados, PINs y huellas dactilares</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Button className='w-full bg-[#00B179] hover:bg-[#00B179]/90'>Gestionar Empleados</Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className='mt-8 border-0 shadow-sm'>
          <CardHeader>
            <CardTitle className='text-[#2C2C2C] flex items-center'>
              <Clock className='w-5 h-5 mr-2' />
              Actividad Reciente
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              {todayRecords.slice(0, 5).map((record) => (
                <div key={record.id} className='flex items-center justify-between p-3 bg-gray-50 rounded-lg'>
                  <div className='flex items-center space-x-3'>
                    <div className='w-8 h-8 bg-[#004E64] rounded-full flex items-center justify-center'>
                      <span className='text-white text-xs font-bold'>
                        {record.employeeName
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </span>
                    </div>
                    <div>
                      <p className='font-medium text-[#2C2C2C]'>{record.employeeName}</p>
                      <p className='text-sm text-gray-600'>
                        {record.clockIn !== null && record.clockOut === null && `Entrada: ${record.clockIn !== undefined ? record.clockIn : 'Pendiente'}`}
                        {record.clockOut !== null && `Salida: ${record.clockOut !== undefined ? record.clockOut : 'Pediente'}`}
                      </p>
                    </div>
                  </div>
                  <div
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      record.clockOut !== undefined ? 'bg-[#FF914D]/10 text-[#FF914D]' : 'bg-[#00B179]/10 text-[#00B179]'
                    }`}
                  >
                    {record.clockOut !== undefined ? 'Salida' : 'Entrada'}
                  </div>
                </div>
              ))}
              {todayRecords.length === 0 && (
                <p className='text-gray-500 text-center py-4'>No hay actividad registrada hoy</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
