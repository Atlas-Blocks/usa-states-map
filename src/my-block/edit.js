/**
 * Edit function for the USA States Map block.
 * This component renders the block in the editor and provides the UI for editing its attributes.
 */

// Import React state hook for managing local editor state

import { useState } from '@wordpress/element';

// Import Gutenberg block utilities and editable rich text component

import { useBlockProps, RichText } from '@wordpress/block-editor';

// Import Gutenberg UI components used in the editor panel

import { 
	Button, 
	TextControl, 
	ToggleControl, 
	ColorPalette, 
	PanelBody 
} from '@wordpress/components';

// Import array of state names used for searching/filtering

import states from './states';

// Import SVG path data for each state to render the map
import { statesPaths } from './statePaths';

/* Main edit function for the block, 
which renders the block in the editor and provides the UI for editing its attributes */

export default function Edit( { attributes, setAttributes } ) {
	const { title, 
		stateSearch, 
		selectedStates, 
		listTitle, 
		showStateList,
		activeStateColor = '#16a34a',
		defaultStateColor = '#f9f9f9' 
	} = attributes;
	const [ isEditing, setIsEditing ] = useState( false );

	// Function for filtering states based on search input and exclude already selected states
	const filteredStates = states.filter( ( state ) => 
		state.toLowerCase().includes( stateSearch.toLowerCase() ) && !selectedStates.includes( state )
 	);

	/**
	 * Adds state to list if does not exist, otherwise returns without adding.
	 * @param {*} stateToAdd 
	 * @returns 
	 */
	const addState = ( stateToAdd ) => {
		if ( selectedStates.includes( stateToAdd ) ) {
			return;
		}

	setAttributes( {
		selectedStates: [ ...selectedStates, stateToAdd ],
		stateSearch: '',
		} );
	};

	/**
	 * Removes a state from the selected states list.
	 * @param {*} stateToRemove 
	 */

	const removeState = ( stateToRemove ) => {
		setAttributes( {
			selectedStates: selectedStates.filter( ( state ) => 
				state !== stateToRemove ),
		} );
	};

	// Main return statement that conditionally renders either the editing panel or the block preview based on isEditing state
	return (
		<div { ...useBlockProps() }>
			{ isEditing ? (
				<div className="maps-block-editor__panel">
					<div className="maps-block-editor-panel__header">
						Edit Map
					</div>

					{	/* Text control for editing the map title, which updates the title attribute on change */ }
					<TextControl
						label="Map Title"
						value={ title }
						onChange={ ( value ) => setAttributes( { title: value } ) }
					/>

					{ /* Text control for editing the title of the selected states list */ }
					<TextControl
						label="List Title"
						value={ listTitle }
						onChange={ ( value ) => setAttributes( { listTitle: value } ) }
					/>
					
					{ /* Toggle control for showing/hiding the selected states list in the block preview */ }
					<ToggleControl
						label="Show state list"
						checked={ showStateList }
						onChange={ ( value ) => setAttributes( { showStateList: value } ) }
					/>

					{ /* Text control for searching states to add to the selected states list */ }
					<TextControl
						label="Search states"
						value={ stateSearch }
						onChange={ ( value ) => setAttributes( { stateSearch: value } ) }
						placeholder="Type a state name..."
					/>

					{ /* Dropdown that shows filtered states based on search input, 
					allowing users to click and add states to the selected list */ }

					{ stateSearch && filteredStates.length > 0 && (
						<div className="maps-block-editor__dropdown">
							{ filteredStates.map( ( state ) => (
								<button
									key={ state }
									type="button"
									className="maps-block-editor__dropdown-item"
									onClick={ () =>
										addState( state )
									}
								>
									{ state }
								</button>
							) ) }
						</div>
					) }

					{ /* Button to clear all selected states at once */ }
					<button
						type="button"
						className="maps-block-editor__clear-states-button"
						onClick={() => setAttributes({ selectedStates: [] })}
					>
						Clear States
					</button>

					{ /* Color palette controls for selecting the colors of active and inactive states on the map */ }
					<div className="maps-block-editor__color-row">
						{ /* Active state color picker */ }
						<div className="maps-block-editor__color-control">
							<p className="maps-block-editor__color-label">Selected State Color</p>
							<ColorPalette
								value={activeStateColor}
								onChange={(color) =>
									setAttributes({ activeStateColor: color || '#16a34a' })
								}
							/>
						</div>
						
						{ /* Inactive state color picker */ }
						<div className="maps-block-editor__color-control">
							<p className="maps-block-editor__color-label">Unselected State Color</p>
							<ColorPalette
								value={defaultStateColor}
								onChange={(color) =>
									setAttributes({ defaultStateColor: color || '#f9f9f9' })
								}
							/>
						</div>

					</div>

					{ /* List of selected states and their removal buttons */ }
					{ selectedStates.length > 0 && (
						<div className="maps-block-editor__selected-states">
							<h4>States Selected</h4>
							<ul>
								{ selectedStates.map( ( state ) => (
									<li key={ state }>
										{ state }
										<button
											type="button"
											className="maps-block-editor__remove-button"
											onClick={ () => removeState( state ) }
										>
											x
										</button>
									</li>
								) ) }
							</ul>
						</div>
					) }

					{ /* Button for reviewing the map with selected states highlighted based on the current editor settings */ }
					<div className="maps-block-editor-panel__actions">
						<Button
							variant="secondary"
							onClick={ () => setIsEditing( false ) }
						>
							Done
						</Button>
					</div>
				</div>

			) : (
				
				/* Block preview that shows the map with selected states highlighted and the list of selected states if enabled */
				<div className="maps-block-wrapper">
					<div className="maps-block">

						<h2 className="maps-block__tag">{ title }</h2>
						
						{ /* SVG map rendering with paths for each state, 
						where fill color is determined by whether the state is selected or not */ }

						<div className="maps-block__image-wrapper">
							<svg viewBox="0 0 1000 589">
								{statesPaths.map((state) => (
									<path
									key={state.id}
									id={state.id}
									data-name={state.name}
									className={`state ${selectedStates.includes(state.name) ? 'is-active' : ''}`}
									d={state.d}
									/* Apply active or default color based on whether the state is selected, 
									with a smooth transition defined in CSS */
									style={{
										fill: selectedStates.includes(state.name)
											? activeStateColor
											: defaultStateColor,
									}}
									/>
								))}
								</svg>
						</div>
					</div>
					
					{ /* Conditionally render the selected states list and progress bar if showStateList is true */ }
					{ showStateList && (
						<div className="maps-block-selected">
							<div className="maps-block-selected__header">

								{ /* Header section of the selected states list, showing the list title and count of selected states */ }
								<div className="maps-block-selected__header-main">
									<h3 className="maps-block-selected__title">
										{ listTitle || "Selected States" }
									</h3>
									<span className="maps-block-selected__count">
										{ selectedStates.length } selected states
									</span>
								</div>

								{ /* Progress bar showing the percentage of selected states in bar and label */ }
								<div className="maps-block-selected__progress">
									<div className="maps-block-selected__progress-label">
										<span>{ selectedStates.length } of 50 States</span>
										<span>{ Math.round( ( selectedStates.length / 50 ) * 100 ) }%</span>
									</div>

									<div className="maps-block-selected__progress-bar">
										<div
											className="maps-block-selected__progress-fill"
											style={ {
												width: `${ ( selectedStates.length / 50 ) * 100 }%`,
											} }
										/>
									</div>
								</div>
							</div>

							{ /* Body of the selected states list, 
							showing either the list of selected states or a message if no states are selected */ }

							<div className="maps-block-selected__body">
								{ selectedStates.length > 0 ? (
									<div className="maps-block-selected__list">
										{ [ ...selectedStates ].sort().map( ( state ) => (
											<div key={ state } className="maps-block-selected__item">
												<span className="maps-block-selected__name">{ state }</span>
											</div>
										) ) }
									</div>
								) : (
									<p className="maps-block-selected__empty">
										No states selected yet
									</p>
								) }
							</div>
						</div>
					) }

					{ /* Button to enter editing mode to modify the map and selected states */ }
					<div className="maps-block-box__actions">
						<Button
							variant="secondary"
							onClick={ () => setIsEditing( true ) }
						>
							Edit Map
						</Button>
					</div>
				</div>


			)}

			</div>
	);
}