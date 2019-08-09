import React from 'react';
import { PropTypes } from 'prop-types';
import Spinner from '../../common/Spinner/Spinner';
import PostsList from '../PostsList/PostsList';
import Pagination from '../../common/Pagination/Pagination';
class Posts extends React.Component {

   componentDidMount() {
        const { loadPostsByPage } = this.props;
        loadPostsByPage(1);
    }

    loadPostsPage = (page) => {
        const { loadPostsByPage } = this.props;
        loadPostsByPage(page);
    }

    render() {
        const { posts, request, pages } = this.props;
        const { loadPostsPage } = this;
        console.log(pages)
        return (
            <div>
                {request.pending && <Spinner/>}
                <PostsList posts={posts} />
                <Pagination pages={pages} onPageChange={loadPostsPage}/>;
            </div>
        );
    }
};

Posts.propTypes = {
    posts: PropTypes.arrayOf(
        PropTypes.shape({
            author: PropTypes.string.isRequired,
            id: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            content: PropTypes.string.isRequired,
        })
    ),
    loadPosts: PropTypes.func.isRequired,
};

export default Posts;
