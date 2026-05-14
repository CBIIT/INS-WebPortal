import React from 'react';
import {
  useLocation,
  useHistory,
} from 'react-router-dom';
import styled from 'styled-components';
import ascActiveImage from '../../../assets/img/Ascending.Active.svg';
import ascInActiveImage from '../../../assets/img/Ascending.Inactive.svg';
import descActiveImage from '../../../assets/img/Descending.Active.svg';
import descInActiveImage from '../../../assets/img/Descending.Inactive.svg';

const SortingContainer = styled.div`
  display: flex;
  float: left;
`;

const SortingLabel = styled.div`
  line-height: 37.5px;
  padding-right: 10px;
  padding-left: 20px;
  color: #000;
    font-weight: 400;
    font-family: Lato;
    font-size: 14px;
`;

const SortingOrderASC = styled.div`
  width: 25px;
  background-repeat: no-repeat;
  background-position: center;
  background-image: url(${ascActiveImage});
  margin-left: 13px;
  cursor: pointer;
`;

const SortingOrderASCInactive = styled.div`
  width: 25px;
  background-repeat: no-repeat;
  background-position: center;
  background-image: url(${ascInActiveImage});
  margin-left: 13px;
  cursor: pointer;
`;

const SortingOrderDESC = styled.div`
  width: 25px;
  background-repeat: no-repeat;
  background-position: center;
  background-image: url(${descActiveImage});
  margin-left: 7px;
  cursor: pointer;
`;

const SortingOrderDESCInactive = styled.div`
  width: 25px;
  background-repeat: no-repeat;
  background-position: center;
  background-image: url(${descInActiveImage});
  margin-left: 7px;
  cursor: pointer;
`;

const useQuery = () => new URLSearchParams(useLocation().search);

const replaceQueryStr = (query, sortOrder) => {
  let str = '';
  if (query.get('search_text')) {
    str += `&search_text=${query.get('search_text')}`;
  }
  if (query.get('filterByResearchArea')) {
    str += `&filterByResearchArea=${query.get('filterByResearchArea')}`;
  }
  if (query.get('filterByToolType')) {
    str += `&filterByToolType=${query.get('filterByToolType')}`;
  }
  if (query.get('page')) {
    str += `&page=${query.get('page')}`;
  }
  if (query.get('pageSize')) {
    str += `&pageSize=${query.get('pageSize')}`;
  }
  if (query.get('sortBy')) {
    str += `&sortBy=${query.get('sortBy')}`;
  }
  str += `&sortOrder=${sortOrder}`;
  return str.substring(1);
};

const Sorting = ({
  sort = {},
}) => {
  const sortV = sort && sort.v ? sort.v : 'desc';
  const query = useQuery();
  const history = useHistory();

  const handleASCSorting = () => {
    const queryStr = replaceQueryStr(query, 'asc');
    history.push(`/resources?${queryStr}`);
  };

  const handleDESCSorting = () => {
    const queryStr = replaceQueryStr(query, 'desc');
    history.push(`/resources?${queryStr}`);
  };

  return (
    <>
      <SortingContainer data-testid="sorting-container">
        <SortingLabel>
          SORT BY TITLE
        </SortingLabel>
      </SortingContainer>
      {
        sortV === 'asc'
          ? (
            <>
              <SortingOrderASC data-testid="sorting-asc-active" onClick={handleASCSorting} />
              <SortingOrderDESCInactive data-testid="sorting-desc-inactive" onClick={handleDESCSorting} />
            </>
          )
          : (
            <>
              <SortingOrderASCInactive data-testid="sorting-asc-inactive" onClick={handleASCSorting} />
              <SortingOrderDESC data-testid="sorting-desc-active" onClick={handleDESCSorting} />
            </>
          )
      }
    </>
  );
};

export default Sorting;
