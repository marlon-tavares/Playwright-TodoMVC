const { test, expect } = require('@playwright/test');

test.describe('Feature: Validação de URLs', () => {
  // Define os slugs diretamente no arquivo de teste
  const slugs = [
      "adecoagro",
      "allied",
      "amaggi",
      "amil",
      "ancar",
      "arcelormittal",
      "armac",
      "arsystem",
      "arteris",
      "aster",
      "atlantica",
      "bahamas",
      "baianaomoveis",
      "band",
      "basf",
      "bat",
      "belagricola",
      "beontag",
      "biolab",
      "biomm",
      "bpbunge",
      "braveo",
      "brl",
      "camargocorrea",
      "cbm",
      "ceci",
      "clamed",
      "claro",
      "clarohmg",
      "conasa",
      "coop",
      "cooperativaholambra",
      "coplacana",
      "cordenonsi",
      "credsystem",
      "cs",
      "dale",
      "defensoriapublica",
      "dialogqa",
      "dimed",
      "disal",
      "ecogen",
      "elinox",
      "embramaco",
      "engineering",
      "espacolaser",
      "eurochem",
      "feluma",
      "fius",
      "flora",
      "foresea",
      "fortlev",
      "freto",
      "garra",
      "gdmseeds", 
      "gip",
      "gpa",
      "gptw",
      "grupobertolini",
      "grupobio",
      "grupocoutinho",
      "grupodreamers",
      "grupomabu",
      "gruporamirocampelo",
      "gruposoma",
      "grupovissimo",
      "grupoyvone",
      "guide",
      "haoc",
      "harus",
      "icts",
      "igua",
      "imc",
      "inpasa",
      "institutoalana",
      "intercement",
      "jamef",
      "jhsf",
      "leaoalimentos",
      "leomadeiras",
      "lhoist",
      "light",
      "live",
      "livelo",
      "login",
      "lojasmm",
      "manserv",
      "marilan",
      "marisa",
      "mca",
      "melitta",
      "milplan",
      "natter",
      "nutrien",
      "nutrienlas",
      "odontoprev",
      "ofner",
      "omie",
      "oncoclinicas",
      "origemenergia",
      "origeo",
      "ouroverdeunidas",
      "passarelli",
      "pensalab",
      "pepapp",
      "petz",
      "pianoorganizado",
      "preventsenior",
      "rendimento",
      "rihappy",
      "saintgobain",
      "saoluiz",
      "sbt",
      "schaeffler",
      "seasolutions",
      "servimed",
      "sextante",
      "sicoobcocre",
      "sicredi",
      "sicrediplanalto",
      "simak",
      "simpar",
      "simpress",
      "sinter",
      "somosdialog",
      "somosnexpe",
      "soufer",
      "sprogroup",
      "subsea",
      "supernosso",
      "tcp",
      "tegma",
      "ultracargo",
      "valid",
      "viavarejo",
      "vittia",
      "wizco",
      "zhouse",
      "zup"
  ];
  
  const baseUrl = 'https://{{slug}}-pwa.dialog.cm/login?redirect=false';

  // Define o número de tentativas
  const maxRetries = 3;

  slugs.forEach((slug) => {
    // Concatena o slug com a base da URL para formar a URL completa
    const url = baseUrl.replace('{{slug}}', slug);

    test(`Testando URL: ${url}`, async ({ page }) => {
      let attempt = 0;
      let success = false;
      const pageTimeout = 20000;

      while (attempt <= maxRetries && !success) {
        try {
          // Tenta navegar até a URL
          await page.goto(url, { timeout: pageTimeout });

          // Validações da tela
          await expect(page.locator('body')).toBeVisible({ timeout: 15000 });
          await expect(page.locator('[data-testid="login.username"]')).toBeVisible({ timeout: 15000 });
          await expect(page.locator('[data-testid="login.password"]')).toBeVisible({ timeout: 15000 });

          // Se tudo correu bem, marca como sucesso
          success = true;
        } catch (error) {
          if (attempt < maxRetries) {
            console.warn(`Tentativa ${attempt + 1} falhou para ${url}. Tentando novamente...`);
            attempt++;
          } else {
            console.error(`Todas as tentativas falharam para ${url}: ${error.message}`);
            throw error; // Lança o erro após todas as tentativas falharem
          }
        }
      }
    });
  });
});