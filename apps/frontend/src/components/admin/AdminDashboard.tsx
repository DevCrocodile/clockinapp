import { Card, CardHeader, CardTitle, CardContent } from '../shared/Card'
import { Button } from '../shared/Button'
import { LogOut, Users, FileText, Building, Calendar, MapPin, UserPlus, Settings } from 'lucide-react'
import type { Employee, ClockRecord, Branch } from '@/types'
import { useSelect } from '@/hooks/useSelect'
import { Select } from '../shared/Select'

interface AdminDashboardProps {
  employees: Employee[]
  clockRecords: ClockRecord[]
  currentBranch: Branch
  availableBranches: Branch[]
  onBranchChange: (branch: Branch) => void
  onLogout: () => void
}

export function AdminDashboard ({
  employees,
  clockRecords,
  currentBranch,
  availableBranches,
  onBranchChange,
  onLogout
}: AdminDashboardProps): React.ReactElement {
  const today = new Date()
  const currentDate = today.toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
  const branch = useSelect({
    required: true,
    defaultValue: currentBranch.name
  })
  return (
    <div className='min-h-screen bg-[#F4F6F8]'>
      {/* Header */}
      <div className='bg-white shadow-sm border-b'>
        <div className='max-w-7xl mx-auto px-6 py-4'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center space-x-6'>
              <div className='flex items-center space-x-4'>
                <div className='w-10 h-10 bg-[#004E64] rounded-lg flex items-center justify-center'>
                  <span className='text-white font-bold'>A</span>
                </div>
                <div>
                  <h1 className='text-2xl font-bold text-[#2C2C2C]'>Panel Administrativo</h1>
                  <p className='text-gray-600'>Sistema de Control de Asistencia</p>
                </div>
              </div>

              {/* Branch and Date Info */}
              <div className='flex items-center space-x-6 text-sm'>
                <div className='flex items-center space-x-2 bg-[#004E64]/5 px-3 py-2 rounded-lg'>
                  <Building className='w-4 h-4 text-[#004E64]' />
                  <span className='font-medium text-[#004E64]'>Sucursal: {currentBranch?.name}</span>
                </div>
                <div className='flex items-center space-x-2 bg-[#00B179]/5 px-3 py-2 rounded-lg'>
                  <Calendar className='w-4 h-4 text-[#00B179]' />
                  <span className='font-medium text-[#00B179]'>{currentDate}</span>
                </div>
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
        {/* Branch Selector Card */}
        <Card className='mb-8 border-0 shadow-sm bg-gradient-to-r from-[#004E64]/5 to-[#00B179]/5'>
          <CardHeader>
            <CardTitle className='text-[#2C2C2C] text-xl flex items-center'>
              <MapPin className='w-5 h-5 mr-2' />Configuración de Sucursal Activa
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='flex items-center justify-between'>
              <div className='flex-1'>
                <p className='text-gray-600 mb-2'>
                  Selecciona la sucursal donde se registrarán las asistencias. Esta configuración afecta todos los
                  registros de clock in/out.
                </p>
                <div className='text-sm text-gray-500'>
                  📍 <strong>Dirección actual:</strong> {currentBranch.address}
                </div>
                {currentBranch.manager !== undefined && (
                  <div className='text-sm text-gray-500 mt-1'>
                    👤 <strong>Encargado:</strong> {currentBranch.manager}
                  </div>
                )}
              </div>
              <div className='flex items-center space-x-3'>
                <div className='text-right'>
                  <p className='text-sm font-medium text-[#2C2C2C] mb-1'>Sucursal Activa:</p>
                  <Select field={branch} options={availableBranches.map(branch => ({ value: branch.id, label: branch.name }))} />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Navigation Buttons */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
          <Card
            className='border-0 shadow-sm cursor-pointer hover:shadow-md transition-all hover:scale-105'
            onClick={() => {}}
          >
            <CardHeader className='pb-3'>
              <div className='flex items-center space-x-3'>
                <div className='w-12 h-12 bg-[#004E64] rounded-lg flex items-center justify-center'>
                  <Users className='w-6 h-6 text-white' />
                </div>
                <div>
                  <CardTitle className='text-[#2C2C2C] text-lg'>Empleados</CardTitle>
                  <p className='text-gray-600 text-sm'>Ver estado y gestionar empleados</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Button className='w-full bg-[#004E64] hover:bg-[#004E64]/90'>Ver Lista de Empleados</Button>
            </CardContent>
          </Card>

          <Card
            className='border-0 shadow-sm cursor-pointer hover:shadow-md transition-all hover:scale-105'
            onClick={() => {}}
          >
            <CardHeader className='pb-3'>
              <div className='flex items-center space-x-3'>
                <div className='w-12 h-12 bg-[#00B179] rounded-lg flex items-center justify-center'>
                  <FileText className='w-6 h-6 text-white' />
                </div>
                <div>
                  <CardTitle className='text-[#2C2C2C] text-lg'>Reportes</CardTitle>
                  <p className='text-gray-600 text-sm'>Consultar horas y asistencia</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Button className='w-full bg-[#00B179] hover:bg-[#00B179]/90'>Ver Reportes</Button>
            </CardContent>
          </Card>

          <Card
            className='border-0 shadow-sm cursor-pointer hover:shadow-md transition-all hover:scale-105'
            onClick={() => {}}
          >
            <CardHeader className='pb-3'>
              <div className='flex items-center space-x-3'>
                <div className='w-12 h-12 bg-[#FF914D] rounded-lg flex items-center justify-center'>
                  <UserPlus className='w-6 h-6 text-white' />
                </div>
                <div>
                  <CardTitle className='text-[#2C2C2C] text-lg'>Registrar empleado</CardTitle>
                  <p className='text-gray-600 text-sm'>Agregar nuevo empleado</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Button className='w-full bg-[#FF914D] hover:bg-[#FF914D]/90'>Registrar Empleado</Button>
            </CardContent>
          </Card>
        </div>

        {/* Configuration Section */}
        <Card className='mb-8 border-0 shadow-sm'>
          <CardHeader>
            <CardTitle className='text-[#2C2C2C] text-xl flex items-center'>
              <Settings className='w-5 h-5 mr-2' />
              Configuración del Sistema
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <Card
                className='border border-[#004E64]/20 cursor-pointer hover:shadow-md transition-all hover:scale-105'
                onClick={() => {}}
              >
                <CardContent className='p-4'>
                  <div className='flex items-center space-x-3'>
                    <div className='w-10 h-10 bg-[#004E64]/10 rounded-lg flex items-center justify-center'>
                      <Users className='w-5 h-5 text-[#004E64]' />
                    </div>
                    <div>
                      <h3 className='font-semibold text-[#2C2C2C]'>Gestión de Roles</h3>
                      <p className='text-sm text-gray-600'>Crear y administrar roles de empleados</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card
                className='border border-[#00B179]/20 cursor-pointer hover:shadow-md transition-all hover:scale-105'
                onClick={() => {}}
              >
                <CardContent className='p-4'>
                  <div className='flex items-center space-x-3'>
                    <div className='w-10 h-10 bg-[#00B179]/10 rounded-lg flex items-center justify-center'>
                      <MapPin className='w-5 h-5 text-[#00B179]' />
                    </div>
                    <div>
                      <h3 className='font-semibold text-[#2C2C2C]'>Gestión de Sucursales</h3>
                      <p className='text-sm text-gray-600'>Administrar sucursales del negocio</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        {/* Key Functions Section */}
        <Card className='border-0 shadow-sm'>
          <CardHeader>
            <CardTitle className='text-[#2C2C2C] text-xl'>Funciones clave</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
              <div className='bg-[#004E64]/5 p-4 rounded-lg text-center'>
                <div className='text-2xl font-bold text-[#004E64] mb-1'>
                  {employees.filter((emp) => emp.isActive).length}
                </div>
                <div className='text-sm text-gray-600'>Empleados Activos</div>
              </div>

              <div className='bg-[#00B179]/5 p-4 rounded-lg text-center'>
                <div className='text-2xl font-bold text-[#00B179] mb-1'>
                  {clockRecords.filter((r) => r.status === 'complete' || r.status === 'in-progress').length}
                </div>
                <div className='text-sm text-gray-600'>Presentes Hoy</div>
              </div>

              <div className='bg-[#FF914D]/5 p-4 rounded-lg text-center'>
                <div className='text-2xl font-bold text-[#FF914D] mb-1'>
                  {clockRecords.filter((r) => r.status === 'break').length}
                </div>
                <div className='text-sm text-gray-600'>En Descanso</div>
              </div>

              <div className='bg-red-50 p-4 rounded-lg text-center'>
                <div className='text-2xl font-bold text-red-600 mb-1'>
                  {clockRecords.filter((r) => r.status === 'absent').length}
                </div>
                <div className='text-sm text-gray-600'>Ausentes</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
