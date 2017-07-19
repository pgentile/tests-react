import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import { Pagination, PaginationItem, PaginationPrevious, PaginationNext } from 'react-foundation';

import { PageComponent } from '../page/components';


class PagerLink extends React.PureComponent {

  render() {
    const {page, isDisabled, onPageChange, children} = this.props;

    if (isDisabled) {
      return (
        <span>{children}</span>
      );
    }

    const goToPage = event => {
      event.preventDefault();
      onPageChange(page);
    };

    return (
      <a onClick={goToPage}>{children}</a>
    );
  }

}

PagerLink.propTypes = {
  page: PropTypes.number.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  onPageChange: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};


class Pager extends React.PureComponent {

  render() {
    const { current, count, onPageChange } = this.props;

    const items = _.range(count).map(index => {
      const page = index + 1;
      const isCurrentPage = (page === current);
      return (
        <PaginationItem key={page} isCurrent={isCurrentPage}>
          <PagerLink isDisabled={isCurrentPage} page={page} onPageChange={onPageChange}>{page}</PagerLink>
        </PaginationItem>
      );
    });

    const isFirstPage = current === 1;
    const isLastPage = current === count;

    return (
      <Pagination isCentered>
        <PaginationPrevious isDisabled={isFirstPage}>
          <PagerLink isDisabled={isFirstPage} page={1} onPageChange={onPageChange}>Première</PagerLink>
        </PaginationPrevious>
        <PaginationPrevious isDisabled={isFirstPage}>
          <PagerLink isDisabled={isFirstPage} page={Math.max(1, current - 1)} onPageChange={onPageChange}>Précédente</PagerLink>
        </PaginationPrevious>
        {items}
        <PaginationNext isDisabled={isLastPage}>
          <PagerLink isDisabled={isLastPage} page={Math.min(count, current + 1)} onPageChange={onPageChange}>Suivante</PagerLink>
        </PaginationNext>
        <PaginationNext isDisabled={isLastPage}>
          <PagerLink isDisabled={isLastPage} page={count} onPageChange={onPageChange}>Dernière</PagerLink>
        </PaginationNext>
      </Pagination>
    );
  }

}

Pager.propTypes = {
  current: PropTypes.number.isRequired,
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};


class PaginatedList extends React.Component {

  constructor(props) {
    super(props);

    this.state = this.computeState(props);

    this.onPageChange = this.onPageChange.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  componentWillReceiveProps(nextProps) {
    this.setState(this.computeState(nextProps))
  }

  computeState({ currentPage, maxPerPage, items }) {
    const pageCount = Math.max(1, Math.ceil(items.length / maxPerPage));
    const realCurrentPage = Math.min(currentPage, pageCount);
    const startIndex = (realCurrentPage - 1) * maxPerPage;
    const endIndex = realCurrentPage * maxPerPage;
    const selectedItems = items.slice(startIndex, endIndex);

    return {
      realCurrentPage,
      pageCount,
      selectedItems,
    };
  }

  onPageChange(page) {
    this.props.onPageChange(page);
  }

  render() {
    const renderedItems = React.createElement(this.props.component, {
      items: this.state.selectedItems,
    });

    return (
      <div>
        {renderedItems}
        <Pager current={this.state.realCurrentPage} count={this.state.pageCount} onPageChange={this.onPageChange} />
      </div>
    );
  }

}

PaginatedList.propTypes = {
  items: PropTypes.array.isRequired,
  currentPage: PropTypes.number.isRequired,
  maxPerPage: PropTypes.number.isRequired,
  component: PropTypes.func.isRequired,
  onPageChange: PropTypes.func.isRequired,
};


function ListItems({items}) {
  const content = items.map(item => {
    return (
      <tr key={item.index}>
        <td>{item.index}</td>
        <td>{item.title}</td>
      </tr>
    );
  })

  return (
    <table>
      <thead>
        <tr>
          <th>Index</th>
          <th>Title</th>
        </tr>
      </thead>
      <tbody>
        {content}
      </tbody>
    </table>
  );
}

ListItems.propTypes = {
  items: PropTypes.array.isRequired,
};


export class PaginationComponent extends React.Component {

  constructor(props) {
    super(props);

    const items = _.range(103).map(index => {
      return {
        index,
        title: `Content at index ${index}`,
      }
    });

    this.state = {
      items,
      maxPerPage: 10,
      currentPage: 1,
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
        <PaginatedList
          items={this.state.items}
          currentPage={this.state.currentPage}
          maxPerPage={this.state.maxPerPage}
          onPageChange={this.onPageChange}
          component={ListItems}/>
      </PageComponent>
    );
  }

}
