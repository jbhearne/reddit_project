import { useSelector, useDispatch } from "react-redux";
import { selectSubreddits, selectSubredditsUrl, fetchSubreddits } from './subredditsSlice';
import { Subreddits } from './Subreddits'
import { fakeSubredditsComponentData } from '../../../__tests__/fakeComponent.data'
import renderer from 'react-test-renderer'
import { BrowserRouter as Router } from 'react-router-dom';
import { NavLink } from 'react-router-dom'

jest.mock('react-redux')
jest.mock('./subredditsSlice')
//jest.mock('react-router-dom')

describe('Subreddits component', () => {
    let mockComponentSubreddits = fakeSubredditsComponentData

    /*fetchSubreddits.mockImplementation(url => {
        mockComponentSubreddits = fakeSubredditsComponentData
    })
    
    useSelector.mockImplementation(selection => {
        if (selection === selectSubreddits) {
            return mockComponentSubreddits
        } else if (selection === selectSubredditsUrl) {
            return 'URLtest'
        } else {
            return 'nope'
        }
    })
    
    useDispatch.mockReturnValue((dis) => dis)*/
    /*it('selectSubreddits', () => {
        useSelector.mockImplementation(selection => {
            if (selection === selectSubreddits) {
                return mockComponentSubreddits
            } else if (selection === selectSubredditsUrl) {
                return 'URLtest'
            } else {
                return 'nope'
            }
        })
        expect(useSelector(selectSubreddits)).toBe(mockComponentSubreddits)
    })*/
    it('should render', () => {
        fetchSubreddits.mockImplementation(url => {
            mockComponentSubreddits = fakeSubredditsComponentData
        })
        
        useSelector.mockImplementation(selection => {
            if (selection === selectSubreddits) {
                return mockComponentSubreddits
            } else if (selection === selectSubredditsUrl) {
                return 'URLtest'
            } else {
                return 'nope'
            }
        })
        
        useDispatch.mockReturnValue((dis) => dis)

        /*NavLink.mockImplementation((props) => { // why can't I mock this? classcomponent
            return (
                <a href={props.to} className={props.className} key={props.key} activeClassName={props.activeClassName}>
                
                </a>
            )
        })*/

        const component = renderer.create(
            <Router>
                <Subreddits />
            </Router>
        )
        let tree = component.toJSON()
        expect(tree).toMatchSnapshot();
        tree = component.toJSON()
        expect(tree).toMatchSnapshot();

    })

})