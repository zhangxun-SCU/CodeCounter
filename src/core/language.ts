


function getLanguageDetail(){
    return {
        python: {
            language: 'python',
            fileTypes: ['py'],
            check: true,
            lines: 0,
            files: []
        },
        java: {
            language: 'java',
            fileTypes: ['java'],
            check: true,
            lines: 0,
            files: []
        },
        c: {
            language: 'c',
            fileTypes: ['c', 'h'],
            check: true,
            lines: 0,
            files: []
        },
        cpp: {
            language: 'cpp',
            fileTypes: ['cpp', 'hpp'],
            check: true,
            lines: 0,
            files: []
        },
        javascript: {
            language: 'javascript',
            fileTypes: ['js'],
            check: true,
            lines: 0,
            files: []
        },
        typescript: {
            language: 'typescript',
            fileTypes: ['ts'],
            check: true,
            lines: 0,
            files: []
        }
    }
}

export { getLanguageDetail }