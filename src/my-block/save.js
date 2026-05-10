/* **
 * Save function for the USA States Map block.
 * This component defines how the block's content is saved and rendered on the front end.
 *
 */

// Import Gutenberg block utilities for saving block content
import { useBlockProps } from '@wordpress/block-editor';

// Import SVG path data for each state to render the map
import { statesPaths } from './statePaths';

// Main save function for the block, which defines how the block's content is saved and rendered on the front end
export default function save( { attributes } ) {
	const {
		title = '',
		selectedStates = [],
		listTitle = '',
		showStateList = true,
		activeStateColor = '#16a34a',
		defaultStateColor = '#f9f9f9'
	} = attributes;

	return (
		<div { ...useBlockProps.save() }>

			{/* Wrapper for the entire block content on the front end, 
			including the map and optional selected states list */ }

			<div className="maps-block-wrapper">
				<div className="maps-block">
					<h2 className="maps-block__tag">{ title }</h2>

					{/* SVG map rendering with paths for each state, 
					where selected states are filled with activeStateColor 
					and others with defaultStateColor */ }

					<div className="maps-block__image-wrapper">
						<svg viewBox="0 0 1000 589">
							{ statesPaths.map( ( state ) => (
								<path
									key={ state.id }
									id={ state.id }
									data-name={ state.name }
									className={ `state ${ selectedStates.includes( state.name ) ? 'is-active' : '' }` }
									d={ state.d }
									style={ {
										fill: selectedStates.includes( state.name )
											? activeStateColor
											: defaultStateColor,
									} }
								/>
							) ) }
						</svg>
					</div>
				</div>

				{/* Conditionally render the selected states list and progress bar if showStateList is true */ }

				{ showStateList && (
					<div className="maps-block-selected">
						<div className="maps-block-selected__header">
							<div className="maps-block-selected__header-main">
								<h3 className="maps-block-selected__title">
									{ listTitle || 'Selected States' }
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
						showing either the list of selected states or a message if none are selected */ }
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
			</div>
		</div>
	);
}