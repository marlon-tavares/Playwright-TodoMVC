import { test, expect } from '@playwright/test';

test('validar hashes com slugs', async ({ page }) => {
    const slugs = [
        'dialogqa',
        'api-dialogqa',
        'outro-slug', // Adicione outros slugs conforme necessário
    ];

    const expectedHash = 'ca2d82ec'; // Valor da hash que queremos verificar

    for (const slug of slugs) {
        const url = `https://${slug}.dialog.cm/git`;
        await page.goto(url);

        let content: string | null = null;

        // Tenta localizar o conteúdo apropriado baseado no slug
        try {
            const preElement = await page.locator('pre');
            content = await preElement.textContent();
        } catch {
            // Se não encontrou o <pre>, tenta o <body>
            const bodyText = await page.locator('body');
            content = await bodyText.textContent();
        }

        // Define a regex para validar e capturar a hash
        const hashRegex = /hash: ([0-9a-f]{7,40})/;

        // Verifica se a hash está no formato correto
        const match = content?.match(hashRegex);
        expect(match).toBeTruthy(); // Verifica se encontramos uma correspondência

        if (match) {
            const actualHash = match[1];
            console.log(`Hash encontrada em ${url}: ${actualHash}`);

            // Verifica se a hash encontrada corresponde ao valor esperado
            expect(actualHash).toBe(expectedHash);
        }
    }
});
