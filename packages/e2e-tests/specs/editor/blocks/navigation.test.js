/**
 * WordPress dependencies
 */
import {
	clickBlockAppender,
	getEditedPostContent,
	createNewPost,
} from '@wordpress/e2e-test-utils';

describe( 'Navigation', () => {
	beforeEach( async () => {
		await createNewPost();
	} );

	it( 'can be created by typing "/navigation"', async () => {
		await page.keyboard.type( '/navigation' );
		await page.waitForXPath(
			`//*[contains(@class, "components-autocomplete__result") and contains(@class, "is-selected") and contains(text(), 'Navigation')]`
		);
		await page.keyboard.press( 'Enter' );

		expect( await getEditedPostContent() ).toMatchSnapshot();
	} );

	it( 'can add page link', async () => {
		//add new navigation block
		await clickBlockAppender();
		await page.keyboard.type( '/navigation' );
		await page.waitForXPath(
			`//*[contains(@class, "components-autocomplete__result") and contains(@class, "is-selected") and contains(text(), 'Navigation')]`
		);
		await page.keyboard.press( 'Enter' );

		//start empty
		const emptyButton = await page.waitForXPath(
			`//*[contains(@class, "wp-block-navigation") and contains(@class, "is-selected")]//button[contains(text(), "Start empty")]`
		);
		await emptyButton.click();

		//add a page link
		await page.keyboard.press( 'Tab' );
		await page.keyboard.press( 'Tab' );
		await page.keyboard.press( 'Enter' );
		await page.keyboard.type( 'link' );
		await page.keyboard.press( 'Tab' );
		await page.keyboard.press( 'Tab' );
		await page.keyboard.press( 'Enter' );

		await page.keyboard.type( 'example.com' );
		const exampleLink = await page.waitForSelector(
			`.components-button.block-editor-link-control__search-item.is-url`
		);
		await exampleLink.click();

		expect( await getEditedPostContent() ).toMatchSnapshot();
	} );
} );
