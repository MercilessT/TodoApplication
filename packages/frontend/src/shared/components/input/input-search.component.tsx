import React, { ChangeEvent } from 'react'
import { InputGroup, Button } from '@blueprintjs/core'
import { useButtonFilterGroupStore } from '~/store/button-group.store'
import { ButtonName } from '~/shared/components/button/button-group.component'
import { useSearchInputStore } from '~/store/input-search.store'

interface SearchInputProps {
	placeholder?: string
	handleButtonClick: (buttonName: ButtonName) => void
}

const SearchInput: React.FC<SearchInputProps> = ({
	placeholder = 'Search...',
	handleButtonClick,
}) => {
	const { selectedButton } = useButtonFilterGroupStore()
	const { inputValue, setInputValue } = useSearchInputStore()

	const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target
		setInputValue(value)
	}

	const handleSearchClick = () => {
		handleButtonClick(selectedButton)
	}

	return (
		<InputGroup
			placeholder={placeholder}
			value={inputValue}
			onChange={handleInputChange}
			rightElement={
				<Button icon="search" minimal onClick={handleSearchClick} />
			}
		/>
	)
}

export default SearchInput
