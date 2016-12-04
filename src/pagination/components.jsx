import _ from 'lodash';
import React from 'react';
import { Pagination, PaginationItem, PaginationPrevious, PaginationNext } from 'react-foundation';


import { PageComponent } from '../page/components';


function PagerLink({ page, current, onPageChange, children }) {
  if (page === current) {
    return (
      <span>{children}</span>
    );
  }

  const goToPage = page => {
    return event => {
      event.preventDefault();
      onPageChange(page);
    };
  };

  return (
    <a onClick={goToPage(page)}>{children}</a>
  );
}

PagerLink.propTypes = {
  page: React.PropTypes.number.isRequired,
  current: React.PropTypes.number.isRequired,
  onPageChange: React.PropTypes.func.isRequired,
  children: React.PropTypes.node.isRequired,
};


export function Pager({ current, count, onPageChange }) {
  const items = _.range(1, count + 1).map(page => {
    const isCurrentPage = (page === current);
    return (
      <PaginationItem key={page} isDisabled={isCurrentPage} isCurrent={isCurrentPage}>
        <PagerLink current={current} page={page} onPageChange={onPageChange}>{page}</PagerLink>
      </PaginationItem>
    );
  });

  return (
    <Pagination>
      <PaginationPrevious isDisabled={current === 1}>
        <PagerLink current={current} page={1} onPageChange={onPageChange}>Première</PagerLink>
      </PaginationPrevious>
      <PaginationPrevious isDisabled={current === 1}>
        <PagerLink current={current} page={Math.max(1, current - 1)} onPageChange={onPageChange}>Précédente</PagerLink>
      </PaginationPrevious>
      {items}
      <PaginationNext isDisabled={current === count}>
        <PagerLink current={current} page={Math.min(count, current + 1)} onPageChange={onPageChange}>Suivante</PagerLink>
      </PaginationNext>
      <PaginationNext isDisabled={current === count}>
        <PagerLink current={current} page={count} onPageChange={onPageChange}>Dernière</PagerLink>
      </PaginationNext>
    </Pagination>
  );
}

Pager.propTypes = {
  current: React.PropTypes.number.isRequired,
  count: React.PropTypes.number.isRequired,
  onPageChange: React.PropTypes.func.isRequired,
};



export class PaginationComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      pageCount: 9,
    };
    this.onPageChange = this.onPageChange.bind(this);
  }

  onPageChange(page) {
    this.setState({
      currentPage: page,
    });
  }

  render() {
    return (
      <PageComponent title="Pagination">
        <Pager current={this.state.currentPage} count={this.state.pageCount} onPageChange={this.onPageChange} />
      </PageComponent>
    );
  }

}
