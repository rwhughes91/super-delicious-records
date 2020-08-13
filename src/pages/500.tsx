export default function Custom500(): JSX.Element {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '3rem',
        color: 'var(--dark-purple-color)',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '100%',
        flexDirection: 'column',
      }}
    >
      <div
        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}
      >
        <div
          style={{
            borderRight: '1px solid var(--light-gray-color)',
            fontFamily: 'Open Sans Light',
            paddingRight: '2rem',
          }}
        >
          500
        </div>
        <div style={{ fontFamily: 'Open Sans Light', padding: '2rem' }}>Server Error</div>
      </div>
    </div>
  )
}
