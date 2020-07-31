import IconContainer from '../IconContainer/IconContainer'

interface Props {
  size?: number
}

const FacebookIcon: React.FC<Props> = (props) => {
  let styles = {}
  if (props.size) {
    styles = { size: props.size }
  }
  return (
    <IconContainer {...styles}>
      {(iconClass) => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          viewBox="0 0 512 512"
          className={iconClass}
        >
          <path
            style={{ fill: 'var(--bright-blue-color)', fillRule: 'evenodd', clipRule: 'evenodd' }}
            d="M480,257.35c0-123.7-100.3-224-224-224s-224,100.3-224,224 c0,111.8,81.9,204.47,189,221.29V322.12h-56.89v-64.77H221v-49.36c0-56.13,33.45-87.16,84.61-87.16c24.51,0,50.15,4.38,50.15,4.38 v55.13h-28.26c-27.81,0-36.51,17.26-36.51,35v42.02h62.12l-9.92,64.77h-52.2v156.53C398.1,461.85,480,369.18,480,257.35L480,257.35z "
          />
        </svg>
      )}
    </IconContainer>
  )
}

export default FacebookIcon
