import styled from 'styled-components';

export const TOCWrapper = styled.div`
  width: 190px;
  overflow: auto;
  background-color: rgba(81,139,125,0.5);
  box-sizing: border-box;
  margin: 5px 5px;
  padding-left: 5px;
  padding-right: 5px;
  
`;

export const TOCTitle = styled.div`
  box-sizing: border-box;
  min-height: 30px;
  padding-left: 10px;
  border: 1px solid darkblue;
  overflow: auto;
  
  span {
    color: blanchedalmond;
    font-size: 18px;
    line-height: 30px;
  }
`;

export const LayerItemWrapper = styled.div`
  
  box-sizing: border-box;
  min-height: 30px;
  padding-left: 10px;
  border: 1px solid darkblue;
  overflow: auto;
  
  
  span {
    color: blanchedalmond;
    font-size: 18px;
    line-height: 30px;
  }
  
  .layerNameSpan {
    font-size: 10px;
  }
  
  .iconfont {
    cursor: pointer;
  }
  
`;

export const LayerToolDiv = styled.div`
  float: right;
  
  &.hide {
    display: none;
  }
`;