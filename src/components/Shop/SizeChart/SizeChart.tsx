import classes from './SizeChart.module.scss'
import Modal from '../../UI/Modal/Modal'

interface Props {
  onClick: () => void
}

const SizeChart: React.FC<Props> = (props) => {
  return (
    <Modal
      show
      left="0"
      top="0"
      onClick={props.onClick}
      styles={{ backgroundColor: 'rgba(0, 0, 0, .6)' }}
    >
      <div className={classes.SizeChart}>
        <button className={classes.Exit} onClick={props.onClick}>
          X
        </button>
        <div className={classes.Title}>Size Chart</div>
        <table className={classes.Table}>
          <thead>
            <tr>
              <th>(in)</th>
              <th>S</th>
              <th>M</th>
              <th>L</th>
              <th>XL</th>
              <th>2XL</th>
              <th>3XL</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Length</td>
              <td>28</td>
              <td>
                29 <span>&frac14;</span>
              </td>
              <td>
                30 <span>&frac14;</span>
              </td>
              <td>
                31 <span>&frac14;</span>
              </td>
              <td>
                32 <span>&frac12;</span>
              </td>
              <td>
                33 <span>&frac12;</span>
              </td>
            </tr>
            <tr>
              <td>Width</td>
              <td>18</td>
              <td>20</td>
              <td>22</td>
              <td>24</td>
              <td>26</td>
              <td>28</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Modal>
  )
}

export default SizeChart
