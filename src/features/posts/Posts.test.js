import { useSelector, useDispatch } from "react-redux";
import { selectPosts, selectPostsUrl, selectPostsPath, selectPostsPrefix, fetchPosts } from './postsSlice';
import { Posts } from './Posts'
import { fakePostsComponentData } from '../../../__tests__/fakeComponent.data'
import renderer from 'react-test-renderer'
import { BrowserRouter as Router } from 'react-router-dom';

jest.mock('react-redux')
jest.mock('./postsSlice')

describe('Posts component', () => {
    let mockComponentPosts = fakePostsComponentData

    it('should render', () => {
        fetchPosts.mockImplementation(url => {
            mockComponentPosts = fakePostsComponentData
        })
        
        useSelector.mockImplementation(selection => {
            if (selection === selectPosts) {
                return mockComponentPosts
            } else if (selection === selectPostsUrl) {
                return 'URLtest'
            } else {
                return 'nope'
            }
        })
        
        useDispatch.mockReturnValue((dis) => dis)

        const component = renderer.create(
            <Router>
                <Posts />
            </Router>
        )
        let tree = component.toJSON()
        expect(tree).toMatchSnapshot();
        tree = component.toJSON()
        expect(tree).toMatchSnapshot();

    })

})