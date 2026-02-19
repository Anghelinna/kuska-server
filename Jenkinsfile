pipeline {
    agent any

    tools {
        nodejs 'NodeJS-18'
    }

    environment {
        SONAR_TOKEN         = credentials('sonar-token')
        DATABASE_URL        = credentials('database-url')
        DIRECT_URL          = credentials('direct-url')
        SONAR_HOST_URL      = 'https://sonarcloud.io'
        SONAR_PROJECT_KEY   = 'Anghelinna_kuska-server'
        SONAR_ORGANIZATION  = 'anghelinna123'
    }

    options {
        skipDefaultCheckout(false)
        timestamps()
        timeout(time: 30, unit: 'MINUTES')
        buildDiscarder(logRotator(numToKeepStr: '10'))
    }

    stages {

        // ──────────────────────────────────────────────
        //  BACKEND – kuska-server
        // ──────────────────────────────────────────────

        stage('Backend - Install Dependencies') {
            steps {
                dir('kuska-server') {
                    bat 'npm ci'
                }
            }
        }

        stage('Backend - Prisma Generate') {
            steps {
                dir('kuska-server') {
                    bat 'npx prisma generate'
                }
            }
        }

        stage('Backend - Lint & Type Check') {
            steps {
                dir('kuska-server') {
                    bat 'npx tsc --noEmit'
                }
            }
        }

        stage('Backend - Build') {
            steps {
                dir('kuska-server') {
                    bat 'npm run build'
                }
            }
        }

        stage('Backend - Unit Tests') {
            steps {
                dir('kuska-server') {
                    bat 'npm test'
                }
            }
        }

        // ──────────────────────────────────────────────
        //  FRONTEND – Frontend-Fullstack
        // ──────────────────────────────────────────────

        stage('Frontend - Install Dependencies') {
            steps {
                dir('Frontend-Fullstack') {
                    bat 'npm ci'
                }
            }
        }

        stage('Frontend - Lint') {
            steps {
                dir('Frontend-Fullstack') {
                    bat 'npm run lint'
                }
            }
        }

        stage('Frontend - Type Check') {
            steps {
                dir('Frontend-Fullstack') {
                    bat 'npm run type-check'
                }
            }
        }

        stage('Frontend - Unit Tests') {
            steps {
                dir('Frontend-Fullstack') {
                    bat 'npm test'
                }
            }
        }

        stage('Frontend - Build') {
            steps {
                dir('Frontend-Fullstack') {
                    bat 'npm run build'
                }
            }
        }

        // ──────────────────────────────────────────────
        //  QUALITY GATE – SonarCloud
        // ──────────────────────────────────────────────

        stage('SonarCloud Analysis') {
            environment {
                SCANNER_HOME = tool 'SonarQubeScanner'
            }
            steps {
                dir('kuska-server') {
                    withSonarQubeEnv('SonarCloud') {
                        bat """
                            ${SCANNER_HOME}\\bin\\sonar-scanner.bat ^
                              -Dsonar.projectKey=${SONAR_PROJECT_KEY} ^
                              -Dsonar.organization=${SONAR_ORGANIZATION} ^
                              -Dsonar.sources=src ^
                              -Dsonar.host.url=${SONAR_HOST_URL} ^
                              -Dsonar.token=${SONAR_TOKEN}
                        """
                    }
                }
            }
        }

        stage('Quality Gate') {
            steps {
                timeout(time: 5, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: true
                }
            }
        }

        // ──────────────────────────────────────────────
        //  DATABASE MIGRATION (solo en main)
        // ──────────────────────────────────────────────

        stage('Database Migration') {
            when {
                branch 'main'
            }
            steps {
                dir('kuska-server') {
                    bat 'npx prisma migrate deploy'
                }
            }
        }

        // ──────────────────────────────────────────────
        //  DEPLOY (solo en main)
        // ──────────────────────────────────────────────

        stage('Deploy') {
            when {
                branch 'main'
            }
            steps {
                echo 'Deploy stage placeholder – configure your deployment target here.'
                // Ejemplo para Render (deploy hook):
                // bat 'curl -X POST https://api.render.com/deploy/srv-xxxxx?key=xxxxx'
            }
        }
    }

    post {
        success {
            echo "Pipeline completed successfully for branch: ${env.BRANCH_NAME ?: 'unknown'}"
        }
        failure {
            echo "Pipeline FAILED for branch: ${env.BRANCH_NAME ?: 'unknown'}"
            // Opcional: notificación por correo o Slack
            // mail to: 'team@example.com',
            //      subject: "Jenkins FAILED: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
            //      body: "Check: ${env.BUILD_URL}"
        }
        always {
            cleanWs()
        }
    }
}
