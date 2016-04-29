'use strict';

angular.module 'parko.controllers'
.controller 'UserController', ['$scope', '$mdDialog', '$mdMedia', 'Users', 'Alert', 'Confirmation', ($scope, $mdDialog, $mdMedia, Users, Alert, Confirmation) ->
    $scope.selected = []
    $scope.user = {}
    $scope.query =
        order: 'id'
        limit: 10
        page: 1

    $scope.getUsers = () ->
        queryOptions =
            page: $scope.query.page
            limit: $scope.query.limit

        $scope.promise = Users.query queryOptions, (response) ->
            if response.result is 'OK'
                $scope.users = response.resultData.data
                $scope.query.count = response.resultData.count
            else
                Alert response.resultData.message
            return
        .$promise

    $scope.getUsers()

    useFullScreen = ($mdMedia('sm') or $mdMedia('xs')) and $scope.customFullscreen

    $scope.openEditionWindow = (ev, selected) ->
        $mdDialog.show
            controller: EditionController,
            templateUrl: 'template/userEditWindow.html'
            parent: angular.element(document.body)
            targetEvent: ev
            clickOutsideToClose:false
            fullscreen: useFullScreen
            locals:
                selected: selected
        .then (user) ->
            $scope.getUsers()
            return
        return

    $scope.delete = (ev, selected) ->
        Confirmation ev, 'Deseja remover definitivamente o usuário?', () ->
            Alert 'Usuário removido com sucesso!'
            Users.delete id: selected._id
            $scope.getUsers()
            return
        return

    $scope.blockUser = (ev, selected) ->
        unless selected.isBlocked
            Users.block id: selected._id, (response) ->
                selected.isBlocked = true
                Alert 'Usuário Bloqueado'
                return
            , (err) ->
                Alert err.data.resultData.message
                return
        else
            Users.unblock id: selected._id, (response) ->
                selected.isBlocked = false
                Alert 'Usuário Desbloqueado'
                return
            , (err) ->
                Alert err.data.resultData.message
                return
        return

    return
]

EditionController = ($scope, $mdDialog, Users, Alert, Clone, selected) ->
    $scope.user = Clone selected

    $scope.hide = () ->
        $mdDialog.hide()
        return

    $scope.cancel = () ->
        $mdDialog.cancel()
        return

    $scope.save = (user) ->
        $scope.saving = true
        if $scope.user._id?
            Users.update id: user._id, user, (response) ->
                successFunction response, 'Usuário alterado com sucesso!'
                return
            , errorFunction
        else
            Users.save user, (response) ->
                successFunction response, 'Usuário criado com sucesso!'
            , errorFunction
        return

    successFunction = (response, message) ->
        if response.result is 'OK'
            Alert message
            $mdDialog.hide user
        return

    errorFunction = (err) ->
        Alert err.data.resultData.message
        $scope.saving = false
        return

    return
