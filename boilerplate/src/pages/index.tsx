import { Link, useSearchParams, createSearchParams, useLocation, connect, Helmet } from 'umi';
import logoImg from '@/assets/logo.png';
import './index.less'
import styles from './index.less'

const IndexPage = ({ global, dispatch }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const a = searchParams.get('a')
  const b = searchParams.get('b')
  const location = useLocation() as any;
  console.log('location', location) 

  const click = () => {
    setSearchParams(createSearchParams({ a: '3', b: '4' }))
  }
  return (
    <div>
      <h1>{global.name}</h1>
      <Helmet>
        <title>umi 入门教程</title>
      </Helmet>
      <img src={logoImg} alt="" width={150} />
      <div className='logo'></div>
      <p className={styles['test-module']}>Index Page</p>
      <p>state: {location.state && location.state.c}</p>
      <p>a: {a}</p>
      <p>b: {b}</p>
      <button onClick={() => click()}>点击设置url参数</button>
      <button
        onClick={() => {
          dispatch({
            type: 'global/changeName',
            payload: {
              name: 'umi 入门教程-dva',
            },
          });
        }}
      >
        click me!
      </button>
      <p><Link to="/user">Go to user page</Link></p>
    </div>
  )
}

export default connect(({ global }) => ({
  global
}))(IndexPage)
