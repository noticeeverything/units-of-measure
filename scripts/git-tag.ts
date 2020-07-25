import {exec} from 'shelljs';
import {logError} from '../shell-functions';

(async function gitTag() {
  const tag = process.argv[2];
  if (!tag) {
    logError('You must pass a tag as an argument to this function');
    process.exit(-1);
  }

  // Stage deploy tag should look like <project>@stage
  // Prod tag should look like <project>@v0.0.0
  const TAG_REGEX = /^(?:noticeeverything|spurlingguitars|playground|justinmcmahon|sfhistoricmaps)-(?:api|www|admin)@v\d\.\d\.\d$/;
  if (!TAG_REGEX.test(tag)) {
    logError(`expected "${tag}" to follow the pattern <project>@<v<n.n.n>>`);
    process.exit(-1);
  }

  // Delete tag locally and remotely
  // If it doesn't exist there will be an error in the console, but execution will continue
  exec(`git tag -d ${tag}`);
  exec(`git push origin :${tag}`);

  // Create and push the tag
  exec(`git tag ${tag} -f`);
  exec(`git push --tags -f`);
})();
