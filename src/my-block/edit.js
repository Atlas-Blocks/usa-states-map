import { useState } from '@wordpress/element';
import { useBlockProps, RichText } from '@wordpress/block-editor';
import { Button, TextControl, ToggleControl, ColorPalette, PanelBody } from '@wordpress/components';

import states from './states';
import { statesPaths } from './statePaths';

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

	const removeState = ( stateToRemove ) => {
		setAttributes( {
			selectedStates: selectedStates.filter( ( state ) => 
				state !== stateToRemove ),
		} );
	};

	return (
		<div { ...useBlockProps() }>
			{ isEditing ? (
				<div className="maps-block-editor__panel">
					<div className="maps-block-editor-panel__header">
						Edit Map
					</div>

					<TextControl
						label="Map Title"
						value={ title }
						onChange={ ( value ) => setAttributes( { title: value } ) }
					/>

					<TextControl
						label="List Title"
						value={ listTitle }
						onChange={ ( value ) => setAttributes( { listTitle: value } ) }
					/>

					<ToggleControl
						label="Show state list"
						checked={ showStateList }
						onChange={ ( value ) => setAttributes( { showStateList: value } ) }
					/>

					<TextControl
						label="Search states"
						value={ stateSearch }
						onChange={ ( value ) => setAttributes( { stateSearch: value } ) }
						placeholder="Type a state name..."
					/>


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

					<button
						type="button"
						className="maps-block-editor__clear-states-button"
						onClick={() => setAttributes({ selectedStates: [] })}
					>
						Clear States
					</button>

					<div className="maps-block-editor__color-row">

					<div className="maps-block-editor__color-control">
							<p className="maps-block-editor__color-label">Selected State Color</p>
							<ColorPalette
								value={activeStateColor}
								onChange={(color) =>
									setAttributes({ activeStateColor: color || '#16a34a' })
								}
							/>
						</div>

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

				<div className="maps-block-wrapper">
					<div className="maps-block">

						<h2 className="maps-block__tag">{ title }</h2>
						
						<div className="maps-block__image-wrapper">
							<svg viewBox="0 0 1000 589">
								{statesPaths.map((state) => (
									<path
									key={state.id}
									id={state.id}
									data-name={state.name}
									className={`state ${selectedStates.includes(state.name) ? 'is-active' : ''}`}
									d={state.d}
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
					
					{ showStateList && (
						<div className="maps-block-selected">
							<div className="maps-block-selected__header">
								<div className="maps-block-selected__header-main">
									<h3 className="maps-block-selected__title">
										{ listTitle || "Selected States" }
									</h3>
									<span className="maps-block-selected__count">
										{ selectedStates.length } selected states
									</span>
								</div>

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