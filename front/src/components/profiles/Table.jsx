import React from "react";

function Table() {
    return (
        <div className="flex">
            <div class="mx-auto shadow-md sm:rounded-lg">
                <table class=" w-full text-sm text-left text-gray-500 ">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 ">
                        <tr>
                            <th scope="col" class="py-3 px-6">
                                Nom projet
                            </th>
                            <th scope="col" class="py-3 px-6">
                                Utilisateur
                            </th>
                            <th scope="col" class="py-3 px-6">
                                Date
                            </th>
                            <th scope="col" class="py-3 px-6">
                                Status
                            </th>
                            <th scope="col" class="py-3 px-6">
                                <span class="sr-only">action</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="bg-white border-b  hover:bg-gray-50 ">
                            <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap ">
                                Projet 1
                            </th>
                            <td class="py-4 px-6">
                                Remy
                            </td>
                            <td class="py-4 px-6">
                                20/08/22
                            </td>
                            <td class="py-4 px-6">
                                en cours
                            </td>
                            <td class="py-4 px-6 text-right">
                                <a href="." class="font-medium text-blue-600  hover:underline">action</a>
                            </td>
                        </tr>
                        <tr class="bg-white border-b   hover:bg-gray-50 ">
                            <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap ">
                                Projet 2
                            </th>
                            <td class="py-4 px-6">
                                Nam
                            </td>
                            <td class="py-4 px-6">
                                20/08/22
                            </td>
                            <td class="py-4 px-6">
                                en attente de validation
                            </td>
                            <td class="py-4 px-6 text-right">
                                <a href="." class="font-medium text-blue-600 da hover:underline">action</a>
                            </td>
                        </tr>
                        <tr class="bg-white  hover:bg-gray-50 ">
                            <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap ">
                                Projet 3
                            </th>
                            <td class="py-4 px-6">
                                Vincent
                            </td>
                            <td class="py-4 px-6">
                                20/08/22
                            </td>
                            <td class="py-4 px-6">
                                en cours
                            </td>
                            <td class="py-4 px-6 text-right">
                                <a href="." class="font-medium text-blue-600  hover:underline">action</a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

    )
}
export default Table;