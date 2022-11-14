/*
Copyright 2022 Yarmo Mackenbach

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
import express from 'express'
const router = express.Router()

router.get('*', (req, res) => {
  return res.status(501).send('Proxy v1 API endpoint is no longer supported, please migrate to proxy v2 API endpoint')
})

export default router
