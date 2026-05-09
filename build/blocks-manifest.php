<?php
// This file is generated. Do not modify it manually.
return array(
	'my-block' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'create-block/usa-states-map',
		'version' => '0.1.0',
		'title' => 'USA States Map',
		'category' => 'design',
		'icon' => 'align-pull-left',
		'description' => 'Map of US States with availability of a product or service.',
		'supports' => array(
			'html' => false,
			'align' => array(
				'wide',
				'full'
			)
		),
		'attributes' => array(
			'title' => array(
				'type' => 'string',
				'default' => 'USA States Map'
			),
			'listTitle' => array(
				'type' => 'string',
				'default' => 'Available States'
			),
			'stateSearch' => array(
				'type' => 'string',
				'default' => ''
			),
			'selectedStates' => array(
				'type' => 'array',
				'default' => array(
					
				)
			),
			'showStateList' => array(
				'type' => 'boolean',
				'default' => true
			),
			'activeStateColor' => array(
				'type' => 'string',
				'default' => '#16a34a'
			),
			'defaultStateColor' => array(
				'type' => 'string',
				'default' => '#6b7280'
			)
		),
		'textdomain' => 'my-block',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css'
	)
);
