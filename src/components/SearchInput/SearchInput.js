import React, { useState, useContext } from 'react';
import { SearchInputWrapper, SearchInputMain, SearchInputList } from './SearchInput.style';
import InputText from 'components/common/InputText';
import Dropdown from 'components/Dropdown';
import SymbolsContext from 'data/context/SymbolsContext';
import { marketListDropdownElements } from 'data/content/HomePage';
import { Link } from 'react-router-dom';

const SearchInput = () => {
    const [inputValue, setInputValue] = useState('');
    const [searchResults, setsearchResults] = useState([]);
    const [searchResultsCount, setSeatchResultsCount] = useState(0);
    const [instrumentType, setInstrumentType] = useState(marketListDropdownElements[0].value);
    const instrumentSymbols = useContext(SymbolsContext);

    const MAX_LIST_LENGTH = 10;

    const handleSearchResults = value => {
        const field = instrumentType === 'stocks' ? 'description' : 'displaySymbol';
        let results = instrumentSymbols[instrumentType].filter(element => element[field].toUpperCase().includes(value.toUpperCase()));
        setSeatchResultsCount(results.length);
        if (results.length > MAX_LIST_LENGTH) {
            results = results.slice(0, MAX_LIST_LENGTH);
        }
        value === '' ? setsearchResults([]) : setsearchResults(results);
    };

    const handleInputOnChange = event => {
        const { value } = event.target;
        setInputValue(value.toUpperCase());
        handleSearchResults(value);
    };

    const handleDropdownChange = value => {
        setInstrumentType(value);
    };

    return (
        <SearchInputWrapper>
            <SearchInputMain>
                <InputText value={inputValue} onChange={handleInputOnChange} />
                <SearchInputList isVisible={searchResults.length}>
                    {searchResults.map(element => (
                        <Link to={`/instrument/${instrumentType}/${element.displaySymbol}`} key={element.displaySymbol}>
                            <li>{element.displaySymbol}</li>
                        </Link>
                    ))}
                    {searchResults.length >= MAX_LIST_LENGTH && <li>And {searchResultsCount - MAX_LIST_LENGTH} more...</li>}
                </SearchInputList>
            </SearchInputMain>
            <Dropdown dropdownElements={marketListDropdownElements} onChange={handleDropdownChange} />
        </SearchInputWrapper>
    );
};

export default SearchInput;
