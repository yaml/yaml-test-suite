## How to make a release

Make sure main and data are in a clean state.

    export RELEASEDATE=2022-01-17
    # Release for the main branch
    git tag -a v$RELEASEDATE
    # enter in editor:
        # v$RELEASEDATE
        #
        # Longer release details
    git push origin v$RELEASEDATE
    # Prepare data directory
    cd data
    # Avoid the tag being part of a branch that might be squashed
    git co --orphan data-release
    git rm --cached -r .
    rm -r *
    cd ..
    make data-update
    # check
    make data-status
    cd data
    # `git add` should already been done by make data-status
    # git status
    git commit -m "Generated from main <sha>"
    git tag -a data-$RELEASEDATE
    # enter in editor:
        # data-$RELEASEDATE
        #
        # Longer release details
    git push origin data-$RELEASEDATE

