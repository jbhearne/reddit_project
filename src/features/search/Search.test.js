import { useSelector, useDispatch } from "react-redux";
import { selectSearch } from './searchSlice';
import { Search } from './Search';
import renderer from 'react-test-renderer';
import { BrowserRouter as Router } from 'react-router-dom';

jest.mock('react-redux');
jest.mock('./searchSlice');

describe('Search component', () => {
    let mockComponentSearch = 'searchTest';

    it('should render', () => {
        useSelector.mockImplementation(selection => {
            if (selection === selectSearch) {
                return mockComponentSearch;
            } else {
                return 'nope';
            };
        });
        useDispatch.mockReturnValue((dis) => dis);
        const component = renderer.create(
            <Router>
                <Search />
            </Router>
        );
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
        tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});