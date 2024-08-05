import { history, useNavigate, createSearchParams } from 'umi';

export default function User() {
    const navigate = useNavigate();
    return (
        <div>
            <h1>User Page</h1>
            <button onClick={() => history.back()}>go back by history!</button>
            <button onClick={() => history.push('/', { c: '888' })}>go to index by history!</button>
            <button onClick={() => navigate(-1)}>go back by navigate!</button>
            <button onClick={() => navigate('/', {
              state: {
                c: '888'
              }
            })}>go to index by navigate!</button>
        </div>
    );
}