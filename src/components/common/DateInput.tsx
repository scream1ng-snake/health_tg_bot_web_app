import moment from "moment"

const wrapperStyle = { marginBottom: '1rem', zIndex: 1000 }
const labelStyle = { display: 'block', marginBottom: '0.25rem' }
const inputStyle = {
  display: 'block',
  width: '100%',
  height: 'calc(2.25rem + 2px)',
  padding: '0.375rem 0.75rem',
  fontFamily: 'inherit',
  fontSize: '1rem',
  fontWeight: '400',
  lineHeight: '1.5',
  color: '#212529',
  backgroundColor: '#fff',
  backgroundClip: 'padding-box',
  border: '1px solid #bdbdbd',
  borderRadius: '0.25rem',
  transition: 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out'
}




export const DateInput: React.FC<{
  value: string,
  onChange: (data: string) => void,
  name: string,
  label: string
}> = ({ name, label, value, onChange }) => {
  return (
    <div style={wrapperStyle}>
      <label htmlFor={name} style={labelStyle}>
        {label + ':'}
      </label>

      <input
        type="date"
        id={name}
        name={name}
        value={value}
        style={inputStyle}
        onChange={(e) => onChange(e.target.value)}
        max={moment(new Date().toISOString()).format('YYYY-MM-DD')}
      />
    </div>
  )
}

export const Select: React.FC<{
  data: Array<{ name: string, id: string }>,
  name: string,
  label: string,
  placeholder: string,
  onSelect: (name: string) => void,
  selected: string
}> = ({ name, label, data, placeholder, onSelect, selected }) => {
  return (
    <div style={wrapperStyle}>
      <label htmlFor={name} style={labelStyle}>
        {label + ':'}
      </label>

      <select 
        style={inputStyle} 
        name={name} 
        id={name} 
        defaultValue={selected ?? ''} 
        placeholder={placeholder}
        onChange={(e) => onSelect(e.target.value)}
      >
        <option value="">{placeholder}</option>
        {data.map((item) => 
          <option value={item.name} key={item.id}>{item.name}</option>
        )}
      </select>
    </div>
  )
}