<?php
/**
 * Plugin Name:       Atlas Blocks USA States Map
 * Description:       Interactive Gutenberg USA states map block with customizable SVG state selection.
 * Version:           0.1.0
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Author:            Evan Hatfield
 * License:           MIT
 * Text Domain:       atlas-blocks-usa-states-map
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}
/**
 * Registers the block(s) metadata from the `blocks-manifest.php` and registers the block type(s)
 * based on the registered block metadata. Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://make.wordpress.org/core/2025/03/13/more-efficient-block-type-registration-in-6-8/
 * @see https://make.wordpress.org/core/2024/10/17/new-block-type-registration-apis-to-improve-performance-in-wordpress-6-7/
 */
function atlas_blocks_usa_states_map_init() {
	register_block_type( __DIR__ . '/build/my-block' );
}
add_action( 'init', 'atlas_blocks_usa_states_map_init' );
