describe('Project pagination', () => {
    const getProjectPath = "/users/user/projects"

    beforeEach(() => {
        cy.loginAsUser();

        cy.interceptAuthApiGetPaginatedPage(getProjectPath, 0, 10, 'projects/pagination/projects-paginated-page-0-size-10.json');
        cy.interceptAuthApiGetPaginatedPage(getProjectPath, 0, 5, 'projects/pagination/projects-paginated-page-0-size-5.json');
        cy.interceptAuthApiGetPaginatedPage(getProjectPath, 1, 5, 'projects/pagination/projects-paginated-page-1-size-5.json');
        cy.interceptAuthApiGetPaginatedPage(getProjectPath, 2, 5, 'projects/pagination/projects-paginated-page-2-size-5.json');
    });

    it('should display the first page with 5 items', () => {
        cy.get('.p-paginator p-dropdown').click();
        cy.get('.p-dropdown-items span.ng-star-inserted').contains('5').click();

        cy.wait('@pageNumber0-pageSize5');
        cy.get('.project-table tbody tr').should('have.length', 5);
        cy.get('.p-paginator-pages .p-paginator-page').should('have.length', 3);
        cy.get('.p-paginator-current').should('contain.text', 'Toont 1 t/m 5 van de 12 projecten');
    });

    it('should navigate to the next page and display 5 more items', () => {
        cy.get('.p-paginator p-dropdown').click();
        cy.get('.p-dropdown-items span.ng-star-inserted').contains('5').click();

        cy.get('.p-paginator-next').click();
        cy.wait('@pageNumber1-pageSize5');
        cy.get('.project-table tbody tr').should('have.length', 5);
        cy.get('.p-paginator-current').should('contain.text', 'Toont 6 t/m 10 van de 12 projecten');
    });

    it('should navigate to the last page and display remaining items', () => {
        cy.get('.p-paginator p-dropdown').click();
        cy.get('.p-dropdown-items span.ng-star-inserted').contains('5').click();

        cy.get('.p-paginator-last').click();
        cy.wait('@pageNumber2-pageSize5');
        cy.get('.project-table tbody tr').should('have.length', 2);
        cy.get('.p-paginator-current').should('contain.text', 'Toont 11 t/m 12 van de 12 projecten');
    });
});

describe('Role based components', () => {
    const getProjectPath = "/users/user/projects"

    context('User with "klant" role', () => {
        beforeEach(() => {
            cy.loginAsCustomer();
            cy.interceptAuthApiGetPaginatedPage(getProjectPath, 0, 10, 'projects/pagination/projects-paginated-page-0-size-10.json');
        });

        it('should display "Nieuw Project" button in the filter menu', () => {
            cy.get('.filter-menu p-button').should('contain.text', 'Nieuw Project');
        });

        it('should display ellipsis button in each project row', () => {
            cy.get('.project-table tbody tr').each(($row) => {
                cy.wrap($row).find('.fa-ellipsis').should('exist');
            });
        });
    });

    context('User without "klant" role', () => {
        beforeEach(() => {
            cy.loginAsUser();
            cy.interceptAuthApiGetPaginatedPage(getProjectPath, 0, 10, 'projects/pagination/projects-paginated-page-0-size-10.json');
        });

        it('should not display "Nieuw Project" button in the filter menu', () => {
            cy.get('.filter-menu p-button').should('not.exist');
        });

        it('should not display ellipsis button in any project row', () => {
            cy.get('.project-table tbody tr').each(($row) => {
                cy.wrap($row).find('.fa-ellipsis').should('not.exist');
            });
        });
    });
});

describe('Project creation', () => {

    const getProjectPath: string = "/users/user/projects"
    const projectName: string = 'nieuw-project';
    const projectDescription: string = 'project-beschrijving';
    const invalidProjectName: string = 'A';

    beforeEach(() => {
        cy.loginAsCustomer();
        cy.interceptAuthApiGetPaginatedPage(getProjectPath, 0, 10, 'projects/pagination/projects-paginated-page-0-size-10.json');
    });

    it('Should make POST call when creating a project', () => {
        cy.intercept('POST', '/api/projects').as('createProject');

        cy.openProjectCreationModalAndCreateProject(projectName, projectDescription);

        cy.wait('@createProject').then((interception) => {
            expect(interception.request.body.name).to.equal(projectName);
            expect(interception.request.body.description).to.equal(projectDescription);
        });
    });

    it('Should show error when project name is shorter than 3 characters', () => {
        cy.openProjectCreationModalAndCreateProject(invalidProjectName, projectDescription);
        cy.get('.error-message').should('contain.text', 'Naam moet minimaal 3 karakters lang zijn.');
    })

    it('Should show project exists when project already exists', () => {
        cy.intercept('POST', '/api/projects', {
            statusCode: 409,
            body: {
                type: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/409',
                title: 'Conflict',
                status: 409,
                detail: 'Project with name nieuw already exists.',
                instance: '/api/projects'
            },
        }).as('createProjectWhenProjectAlreadyExists');

        cy.openProjectCreationModalAndCreateProject(projectName, projectDescription);
        cy.wait('@createProjectWhenProjectAlreadyExists').then((interception) => {
            expect(interception.response?.body.status).to.equal(409);
        });

        cy.get('.p-dialog-content').should('contain.text', 'Project with name nieuw already exists.');
    });
});

describe('Project deletion', () => {
    const getProjectPath = "/users/user/projects"
    let firstProjectId: string;

    beforeEach(() => {
        cy.loginAsCustomer();
        cy.interceptAuthApiGetPaginatedPage(getProjectPath, 0, 10, 'projects/pagination/projects-paginated-page-0-size-10.json');

        cy.fixture('projects/pagination/projects-paginated-page-0-size-10.json').then((projects) => {
            firstProjectId = projects.content[0].id;
        });
    });

    it('Should make DELETE call when deleting a project', () => {
        cy.intercept('DELETE', '/api/projects/delete/*').as('deleteRequest');

        cy.get('.project-table tbody tr').first().find('.fa-ellipsis').click();
        cy.contains('.p-menu-list span.p-menuitem-text', 'Verwijder project').click();
        cy.get('p-confirmdialog button.p-confirm-dialog-accept').first().click();

        cy.wait('@deleteRequest').then((interception) => {
            expect(interception.request.method).to.equal('DELETE');
            expect(interception.request.url).to.include(`/api/projects/delete/${firstProjectId}`);
        });
    });
});

describe('Project search filter', () => {
    const getProjectPath = "/users/user/projects"
    const searchTerm: string = 'LUMC';
    let searchedProject: object;

    beforeEach(() => {
        cy.loginAsCustomer();
        cy.interceptAuthApiGetPaginatedPage(getProjectPath, 0, 10, 'projects/pagination/projects-paginated-page-0-size-10.json');

        cy.fixture('projects/pagination/projects-paginated-page-0-size-10.json').then((projects) => {
            searchedProject = projects.content[1];
        });
    });

    it('Should show LUMC when writing in filter', () => {

        cy.intercept('GET', `api/users/user/projects?pageNumber=0&pageSize=10&searchTerm=${searchTerm}`, {
            statusCode: 200,
            body: {
                "content": [searchedProject]
            },
        }).as('LUMC');

        cy.get('input[placeholder="Zoeken"]').type('LUMC');

        cy.wait('@LUMC').then((interception) => {
            expect(interception.request.method).to.equal('GET');
            expect(interception.request.url).to.include(`searchTerm=${searchTerm}`);
        });

        cy.get('.project-table tbody tr').should('have.length', 1);
        cy.get('.project-table tbody tr').first().find('td').first().should('contain.text', 'LUMC');
    });
});