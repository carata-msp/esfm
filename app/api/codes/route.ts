import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/prisma'

// GET - Obtener todos los códigos
export async function GET() {
    try {
        const { data: codes, error } = await supabase
            .from('codes')
            .select('*')
            .order('created_at', { ascending: false })

        if (error) {
            console.error('Error de Supabase:', error)
            throw error
        }

        return NextResponse.json(codes || [])
    } catch (error) {
        console.error('Error completo:', error)
        return NextResponse.json(
            { error: 'Error al obtener códigos', details: error },
            { status: 500 }
        )
    }
}

// POST - Agregar un nuevo código
export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { code, password } = body

        if (!code || !password) {
            return NextResponse.json(
                { error: 'Código y contraseña son requeridos' },
                { status: 400 }
            )
        }

        const { data: newCode, error } = await supabase
            .from('codes')
            .insert([{ code, password }])
            .select()
            .single()

        if (error) throw error

        return NextResponse.json(newCode, { status: 201 })
    } catch (error) {
        return NextResponse.json(
            { error: 'Error al crear código' },
            { status: 500 }
        )
    }
}
