import { useBlockProps } from '@wordpress/block-editor';
import { statesPaths } from './statePaths';

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
			<div className="maps-block-wrapper">
				<div className="maps-block">
					<h2 className="maps-block__tag">{ title }</h2>

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
			</div>
		</div>
	);
}