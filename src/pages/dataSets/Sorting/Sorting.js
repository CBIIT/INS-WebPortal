/* eslint-disable react/forbid-prop-types */
import React from 'react';
import {
  useLocation,
  useHistory,
} from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import SelectionInput from '../../../components/SelectionInput';
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
  if (query.get('filterByResource')) {
    str += `&filterByResource=${query.get('filterByResource')}`;
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
  sort,
}) => {
  const query = useQuery();
  const history = useHistory();

  const handleASCSorting = () => {
    const queryStr = replaceQueryStr(query, 'asc');
    history.push(`/datasets?${queryStr}`);
  };

  const handleDESCSorting = () => {
    const queryStr = replaceQueryStr(query, 'desc');
    history.push(`/datasets?${queryStr}`);
  };

  return (
    <>
      <SortingContainer>
        <SortingLabel>
          SORT BY TITLE
        </SortingLabel>
      </SortingContainer>
      {
        sort.v === 'asc'
          ? (
            <>
              <SortingOrderASC onClick={handleASCSorting} />
              <SortingOrderDESCInactive onClick={handleDESCSorting} />
            </>
          )
          : (
            <>
              <SortingOrderASCInactive onClick={handleASCSorting} />
              <SortingOrderDESC onClick={handleDESCSorting} />
            </>
          )
      }
    </>
  );
};

Sorting.propTypes = {
  sort: PropTypes.object.isRequired,
};

export default Sorting;
