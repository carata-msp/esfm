-- Crear la tabla de códigos y contraseñas
CREATE TABLE IF NOT EXISTS codes (
  id SERIAL PRIMARY KEY,
  code TEXT NOT NULL,
  password TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Deshabilitar Row Level Security para permitir acceso público (solo desarrollo)
ALTER TABLE codes DISABLE ROW LEVEL SECURITY;

-- Crear índice para búsquedas más rápidas
CREATE INDEX IF NOT EXISTS idx_codes_created_at ON codes(created_at DESC);

-- Trigger para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_codes_updated_at ON codes;
CREATE TRIGGER update_codes_updated_at BEFORE UPDATE ON codes
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
