import React, { useState, useContext } from 'react';
import { SearchInputWrapper, SearchInputMain, SearchInputList } from './SearchInput.style';
import InputText from 'components/common/InputText';
import Button from 'components/Dropdown';
import SymbolsContext from 'data/context/SymbolsContext';

const SearchInput = () => {
    const [inputValue, setInputValue] = useState('');
    const [searchResults, setsearchResults] = useState([]);
    const [searchResultsCount, setSeatchResultsCount] = useState(0);
    const instrumentSymbols = useContext(SymbolsContext);

    const MAX_LIST_LENGTH = 10;

    const handleSearchResults = value => {
        let results = instrumentSymbols['stocks'].filter(element => element.description.toUpperCase().includes(value.toUpperCase()));
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

    return (
        <SearchInputWrapper>
            <SearchInputMain>
                <InputText value={inputValue} onChange={handleInputOnChange} />
                <SearchInputList isVisible={searchResults.length}>
                    {searchResults.map(element => (
                        <li key={element.displaySymbol}>{element.displaySymbol}</li>
                    ))}
                    {searchResults.length >= MAX_LIST_LENGTH && <li>And {searchResultsCount - MAX_LIST_LENGTH} more...</li>}
                </SearchInputList>
            </SearchInputMain>
        </SearchInputWrapper>
    );
};

export default SearchInput;
