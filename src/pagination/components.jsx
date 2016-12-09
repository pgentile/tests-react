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

  const goToPage = event => {
    event.preventDefault();
    onPageChange(page);
  };

  return (
    <a onClick={goToPage}>{children}</a>
  );
}

PagerLink.propTypes = {
  page: React.PropTypes.number.isRequired,
  current: React.PropTypes.number.isRequired,
  onPageChange: React.PropTypes.func.isRequired,
  children: React.PropTypes.node.isRequired,
};


export function Pager({ current, count, onPageChange }) {
  const items = _.range(count).map(index => {
    const page = index + 1;
    const isCurrentPage = (page === current);
    return (
      <PaginationItem key={page} isCurrent={isCurrentPage}>
        <PagerLink current={current} page={page} onPageChange={onPageChange}>{page}</PagerLink>
      </PaginationItem>
    );
  });

  return (
    <Pagination isCentered>
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


class PaginatedList extends React.Component {

  constructor(props) {
    super(props);

    this.state = this.computeState(props, props.currentPage);

    this.onPageChange = this.onPageChange.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setState(this.computeState(this.props, this.props.currentPage));
    }
  }

  computeState(props, page) {
    const pageCount = Math.max(1, Math.ceil(props.items.length / props.maxPerPage));
    const currentPage = Math.min(page, pageCount);
    const startIndex = (currentPage - 1) * props.maxPerPage;
    const endIndex = currentPage * props.maxPerPage;
    const selectedItems = props.items.length === 0 ? [] : props.items.slice(startIndex, endIndex);

    return {
      currentPage,
      pageCount,
      selectedItems,
    };
  }

  onPageChange(page) {
    this.setState((prevState, props) => this.computeState(props, page));
  }

  render() {
    const renderedItems = React.createElement(this.props.component, {
      items: this.state.selectedItems,
    });

    return (
      <div>
        {renderedItems}
        <Pager current={this.state.currentPage} count={this.state.pageCount} onPageChange={this.onPageChange} />
      </div>
    );
  }

}

PaginatedList.propTypes = {
  items: React.PropTypes.array.isRequired,
  currentPage: React.PropTypes.number.isRequired,
  maxPerPage: React.PropTypes.number.isRequired,
  component: React.PropTypes.func.isRequired,
};

PaginatedList.defaultProps = {
  currentPage: 1,
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
  items: React.PropTypes.array.isRequired,
};


export function PaginatedContentComponent() {
  const content = _.range(103).map(index => {
    return {
      index,
      title: `Content at index ${index}`,
    }
  });

  return (
    <PaginatedList items={content} maxPerPage={10} component={ListItems}/>
  );
}


export class PaginationComponent extends React.Component {

  render() {
    return (
      <PageComponent title="Pagination">
        <PaginatedContentComponent/>
      </PageComponent>
    );
  }

}
