import React, { useState } from 'react';
import styles from './demo.module.css';
import Layout from '@theme/Layout';

function Demo() {
  const DEMO_API_URL = 'https://osusjals.herokuapp.com';

  const [result, setResult] = useState('{ }');
  const [customResult, setCustomResult] = useState('{ }');
  const [originalResult, setOriginalResult] = useState('{ }');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const originalUrl = e.target.originalUrl.value;
    const select = e.target.select.value;
    const path = select == 'basic' ? 'url' : `${select}-url`;
    fetch(`${DEMO_API_URL}/${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify({ originalUrl }),
    })
      .then((res) => res.json())
      .then((json) => setResult(JSON.stringify(json)))
      .catch((err) => console.error(err));
  };

  const handleCustomSubmit = async (e) => {
    e.preventDefault();

    const originalUrl = e.target.originalUrl.value;
    const customWord = e.target.customWord.value;
    fetch(`${DEMO_API_URL}/custom-url`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify({ originalUrl, customWord }),
    })
      .then((res) => res.json())
      .then((json) => setCustomResult(JSON.stringify(json)))
      .catch((err) => console.error(err));
  };

  const handleOriginalSubmit = async (e) => {
    e.preventDefault();

    const convertedPath = encodeURIComponent(e.target.convertedPath.value);
    fetch(`${DEMO_API_URL}/original-url/${convertedPath}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    })
      .then((res) => res.json())
      .then((json) => setOriginalResult(JSON.stringify(json)))
      .catch((err) => console.error(err));
  };

  return (
    <Layout title='Demo'>
      <div className={`container padding-top--md padding-bottom--lg`}>
        <h1>Demo</h1>
        <section>
          <form onSubmit={handleSubmit}>
            <h3>URL 단축하기</h3>
            <select name='select' defaultValue={'basic'}>
              <option value='basic'>Basic</option>
              <option value='emoji'>Emoji</option>
              <option value='title'>Title</option>
            </select>
            <input
              className={'DocSearch-Input'}
              type='url'
              name='originalUrl'
              placeholder='https://original-url.com'
            />
            <button className='button-primary' type='submit'>
              단축하기
            </button>
          </form>
          <h5>Response Result</h5>
          <pre>{result}</pre>
        </section>
        <section>
          <form onSubmit={handleCustomSubmit}>
            <h3>원하는 단어로 URL 단축하기</h3>
            <input
              type='url'
              name='originalUrl'
              placeholder='https://original-url.com'
            />
            <input type='text' name='customWord' placeholder='my-url' />
            <button type='submit'>단축하기</button>
          </form>
          <h5>Response Result</h5>
          <pre>{customResult}</pre>
        </section>
        <section>
          <form onSubmit={handleOriginalSubmit}>
            <h3>원본 URL 가져오기</h3>
            <input type='text' name='convertedPath' placeholder='my-url' />
            <button type='submit'>원본 가져오기</button>
          </form>
          <h5>Response Result</h5>
          <pre>{originalResult}</pre>
        </section>
      </div>
    </Layout>
  );
}

export default Demo;
