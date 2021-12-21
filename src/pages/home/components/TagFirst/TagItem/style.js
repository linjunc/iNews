import styled from 'styled-components'

export const TagItemWrapper = styled.div`
  width: 200px;
  margin-bottom: 15.6px;
  padding: 0 8.4px;
  box-sizing: border-box;

  .tag-container {
    flex-direction: column;
    justify-content: center;
    width: 100%;
    border: 1px solid #f1f1f1;
    text-align: center;
    padding: 18px 0;

    .round {
      justify-content: center;
      width: 50px;
      height: 50px;
      margin-bottom: 10px;
      border-radius: 50%;
      background-color: rgba(24, 144, 255, 0.8);
      color: #fff;
      font-size: 18px;
    }
  }

  .btn {
    width: 70px;
    height: 32px;
    transition: all 0.3s;
    border-radius: 4px;
    border: 1px solid #1890ff;
    cursor: pointer;
    outline: none;
    margin-top: 10px;
    font-size: 15px;
    outline: none;

    &:hover {
      opacity: 0.8;
    }
  }

  .not-concern {
    background-color: #fff;
    color: #1890ff;
  }

  .has-concern {
    background-color: #1890ff;
    color: #fff;
  }
`
